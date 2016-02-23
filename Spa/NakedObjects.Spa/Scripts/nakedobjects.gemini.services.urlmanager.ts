/// <reference path="typings/angularjs/angular.d.ts" />
/// <reference path="typings/lodash/lodash.d.ts" />
/// <reference path="nakedobjects.models.ts" />


module NakedObjects.Angular.Gemini {
    import Decompress = Helpers.decompress;
    import Compress = Helpers.compress;

    export interface IUrlManager {
        getRouteData(): RouteData;
        setError(errorCategory : ErrorCategory, ec? : ClientErrorCode | HttpStatusCode );
        setHome(paneId?: number);
        setMenu(menuId: string, paneId? : number);
        setDialog(dialogId: string, paneId?: number);
        closeDialog(paneId?: number);
        setObject(resultObject: DomainObjectRepresentation, paneId?: number);
        setList(action: ActionMember, paneId?: number);
        setProperty(propertyMember: PropertyMember, paneId?: number);
        setItem(link: Link, paneId?: number): void;
        toggleObjectMenu(paneId?: number): void;
        setInteractionMode(newMode: InteractionMode, paneId? : number);
        setCollectionMemberState(collectionMemberId: string, state: CollectionViewState, paneId?: number): void;
        setListState(state: CollectionViewState, paneId?: number): void;
        setListPaging(newPage: number, newPageSize: number, state: CollectionViewState, paneId?: number): void;
        setListItem(item: number, selected: boolean, paneId?: number ): void;
          
        pushUrlState(paneId?: number): void;
        clearUrlState(paneId?: number): void;
        popUrlState(onPaneId?: number): void;

        swapPanes(): void;
        singlePane(paneId?: number): void;

        setFieldValue: (dialogId: string, p: Parameter, pv: Value, reload?: boolean, paneId? : number) => void;

        setParameterValue: (actionId: string, p: Parameter, pv: Value, reload?: boolean, paneId?: number) => void;

        setPropertyValue: (obj: DomainObjectRepresentation, p: PropertyMember, pv: Value, reload?: boolean, paneId?: number) => void;

        currentpane(): number;

        getUrlState: (paneId?: number) => { paneType: string; search: Object };
        getListCacheIndex: (paneId: number, newPage: number, newPageSize: number, format?: CollectionViewState) => string;

        isHome(paneId?: number): boolean;
        cicero(): void;
    }

    app.service("urlManager", function ($routeParams: ng.route.IRouteParamsService, $location: ng.ILocationService) {
        const helper = <IUrlManager>this;

        // keep in alphabetic order to help avoid name collisions 

        const action = "a";
        const actions = "as";
        const collection = "c";
        const dialog = "d";
        const errorCat = "et";
        const errorCod = "ed";

        const field = "f";
        const interactionMode = "i";        
        const menu = "m";
        const object = "o";
        const page = "pg";
        const pageSize = "ps";
        const parm = "pm";  
        const prop = "pp";
        const selected = "s";
      
        const capturedPanes = [];

        let currentPaneId = 1;

        function createMask(arr) {
            let nMask = 0;
            let nFlag = 0;
            const nLen = arr.length > 32 ? 32 : arr.length;
            for (nFlag; nFlag < nLen; nMask |= arr[nFlag] << nFlag++);
            return nMask;
        }

        function arrayFromMask(nMask) {
            // nMask must be between -2147483648 and 2147483647
            if (nMask > 0x7fffffff || nMask < -0x80000000) {
                throw new TypeError("arrayFromMask - out of range");
            }
            const aFromMask = [];
            for (var nShifted = nMask; nShifted; aFromMask.push(Boolean(nShifted & 1)), nShifted >>>= 1);
            return aFromMask;
        }

        function getSearch() {
            return $location.search();
        }

        function setNewSearch(search) {
            $location.search(search);
        }

        function getIds(typeOfId : string,  paneId : number) {
            return <_.Dictionary<string>> _.pick($routeParams, (v, k) => k.indexOf(typeOfId + paneId) === 0);
        }

        function mapIds(ids : _.Dictionary<string>) : _.Dictionary<string>  {
            return _.mapKeys(ids, (v, k : string) => k.substr(k.indexOf("_") + 1));
        }

        function getAndMapIds(typeOfId: string, paneId: number) {
            const ids = getIds(typeOfId, paneId);
            return mapIds(ids);
        }

        function getMappedValues(mappedIds: _.Dictionary<string>) {
            return _.mapValues(mappedIds, v => Value.fromJsonString(v));
        }

        function getInteractionMode(rawInteractionMode : string) {
            return rawInteractionMode ? InteractionMode[rawInteractionMode] : InteractionMode.View;
        }

        function setPaneRouteData(paneRouteData: PaneRouteData, paneId: number) {

            // todo validate url data - eg cannot have dialog or actions open while editing.
            // consider either cleaning up url or just erroring if unexpected url combination

            paneRouteData.menuId = getId(menu + paneId, $routeParams);
            paneRouteData.actionId = getId(action + paneId, $routeParams);
            paneRouteData.dialogId = getId(dialog + paneId, $routeParams);

            const rawErrorCategory = getId(errorCat + paneId, $routeParams);
            paneRouteData.errorCategory = rawErrorCategory ? ErrorCategory[rawErrorCategory] : null;

            const rawErrorCode = getId(errorCod + paneId, $routeParams);
            paneRouteData.errorCode = rawErrorCode ? paneRouteData.errorCategory === ErrorCategory.HttpClientError ? HttpStatusCode[rawErrorCode]  : ClientErrorCode[rawErrorCode] : null;

            paneRouteData.objectId = getId(object + paneId, $routeParams);
            paneRouteData.actionsOpen = getId(actions + paneId, $routeParams);

            const rawCollectionState: string = getId(collection + paneId, $routeParams);
            paneRouteData.state = rawCollectionState ? CollectionViewState[rawCollectionState] : CollectionViewState.List;

            const rawInteractionMode: string = getId(interactionMode + paneId, $routeParams);
            paneRouteData.interactionMode = getInteractionMode(rawInteractionMode);

            const collKeyMap = getAndMapIds(collection, paneId);
            paneRouteData.collections = _.mapValues(collKeyMap, v => CollectionViewState[v]);

            const parmKeyMap = getAndMapIds(parm, paneId);
            paneRouteData.actionParams = getMappedValues(parmKeyMap);

            const fieldKeyMap = getAndMapIds(field, paneId);
            paneRouteData.dialogFields = getMappedValues(fieldKeyMap);

            const propKeyMap = getAndMapIds(prop, paneId);
            paneRouteData.props = getMappedValues(propKeyMap);

            paneRouteData.page = parseInt(getId(page + paneId, $routeParams));
            paneRouteData.pageSize = parseInt(getId(pageSize + paneId, $routeParams));

            paneRouteData.selectedItems = arrayFromMask(getId(selected + paneId, $routeParams) || 0);

        }


        function singlePane() {
            return $location.path().split("/").length <= 3;
        }

        function searchKeysForPane(search: any, paneId: number, raw : string[]) {
            const ids = _.map(raw, s => s + paneId);
            return _.filter(_.keys(search), k => _.any(ids, id => k.indexOf(id) === 0));
        }

        function allSearchKeysForPane(search: any, paneId: number) {
            const raw = [menu, dialog, object, collection, action, parm, prop, actions, page, pageSize, selected, interactionMode];
            return searchKeysForPane(search, paneId, raw);
        }

        function clearPane(search: any, paneId: number) {
            const toClear = allSearchKeysForPane(search, paneId);
            return _.omit(search, toClear);
        }

        function clearSearchKeys(search: any, paneId: number, keys : string[]) {
            const toClear = searchKeysForPane(search, paneId, keys);
            return _.omit(search, toClear);
        }

        function setupPaneNumberAndTypes(pane: number, newPaneType: string, newMode ?: ApplicationMode) {

            const path = $location.path();
            const segments = path.split("/");
            let [, mode, pane1Type, pane2Type] = segments;
            let changeMode = false;

            if (newMode) {
                const newModeString = newMode.toString().toLowerCase();
                changeMode = mode !== newModeString;
                mode = newModeString;
            }

            // changing item on pane 1
            // make sure pane is of correct type
            if (pane === 1 && pane1Type !== newPaneType) {
                const newPath = `/${mode}/${newPaneType}${singlePane() ? "" : `/${pane2Type}`}`;              
                changeMode = false;
                $location.path(newPath);
            }

            // changing item on pane 2
            // either single pane so need to add new pane of appropriate type
            // or double pane with second pane of wrong type. 
            if (pane === 2 && (singlePane() || pane2Type !== newPaneType)) {
                const newPath = `/${mode}/${pane1Type}/${newPaneType}`;            
                changeMode = false;
                $location.path(newPath);
            }

            if (changeMode) {
                const newPath = `/${mode}/${pane1Type}/${pane2Type}`;
                $location.path(newPath);
            }
        }

        function capturePane(paneId: number) {
            const search = getSearch();
            const toCapture = allSearchKeysForPane(search, paneId);

            return _.pick(search, toCapture);
        }

        function getOidFromHref(href: string) {
            const urlRegex = /(objects|services)\/(.*)\/(.*)/;
            const results = (urlRegex).exec(href);
            return `${results[2]}-${results[3]}`;
        }

      
        function setValue(paneId: number, search: any, p: {id : () => string}, pv: Value, valueType : string) {
            setId(`${valueType}${paneId}_${p.id()}`, pv.toJsonString(), search);
        }

        function setParameter(paneId: number, search: any, p : Parameter,  pv: Value) {
            setValue(paneId, search, p, pv, parm);
        }

        function setField(paneId: number, search: any, p: Parameter, pv: Value) {
            setValue(paneId, search, p, pv, field);
        }

        function setProperty(paneId: number, search: any, p: PropertyMember, pv: Value) {
            setValue(paneId, search, p, pv, prop);           
        }


        enum Transition {
            Null, 
            ToHome,
            ToMenu,
            ToDialog,
            FromDialog, 
            ToObjectView,
            ToList,
            LeaveEdit
        }

        function getId(key: string, search: any) {
            return Decompress(search[key]);
        }

        function setId(key: string, id: string, search: any) {
            search[key] = Compress(id);
        }

        function clearId(key: string, search: any) {
            delete search[key];
        }

        function setFieldsToParms(paneId: number, search: any) {
            const ids = _.filter(_.keys(search), k => k.indexOf(`${field}${paneId}`) === 0);
            const fields = _.pick(search, ids);
            const parms = _.mapKeys(fields, (v, k: string) => k.replace(field, parm));

            search = _.omit(search, ids);
            search = _.merge(search, parms);

            return search;
        }

        function handleTransition(paneId: number, search : any, transition: Transition) {

            switch (transition) {
                case (Transition.ToHome):
                    setupPaneNumberAndTypes(paneId, homePath);
                    search = clearPane(search, paneId);
                    break;
                case (Transition.ToMenu):
                    search = clearPane(search, paneId);
                    break;
                case (Transition.ToDialog):
                case (Transition.FromDialog):
                    const ids = _.filter(_.keys(search), k => k.indexOf(`${field}${paneId}`) === 0);
                    search = _.omit(search, ids);
                    break;
                case (Transition.ToObjectView):
                    setupPaneNumberAndTypes(paneId, objectPath);
                    search = clearPane(search, paneId);
                    setId(interactionMode + paneId, InteractionMode[InteractionMode.View], search);
                    break;
                case (Transition.ToList):
                    search = setFieldsToParms(paneId, search);          
                    setupPaneNumberAndTypes(paneId, listPath);
                    clearId(menu + paneId, search);
                    clearId(object + paneId, search);
                    break;
                case (Transition.LeaveEdit): 
                    search = clearSearchKeys(search, paneId, [prop]);
                    break;
                default:
                    // null transition 
                    break;         
            }

            return search; 
        }

        function executeTransition(newValues: _.Dictionary<string>, paneId: number, transition: Transition, condition: (search) => boolean) {
            currentPaneId = paneId;
            let search = getSearch();
            if (condition(search)) {
                search = handleTransition(paneId, search, transition);

                _.forEach(newValues, (v, k) => {
                        if (v)
                            setId(k, v, search);
                        else
                            clearId(k, search);
                    }
                );
                setNewSearch(search);
            }
        }

        helper.setHome = (paneId = 1) => {
            executeTransition({}, paneId, Transition.ToHome, () => true);
        }

        helper.setMenu = (menuId: string, paneId = 1) => {
            const key = `${menu}${paneId}`;
            const newValues = _.zipObject([key], [menuId]) as _.Dictionary<string>;
            executeTransition(newValues, paneId, Transition.ToMenu, search => getId(key, search) !== menuId);
        };

        helper.setDialog = (dialogId: string, paneId = 1) => {
            const key = `${dialog}${paneId}`;
            const newValues = _.zipObject([key], [dialogId]) as _.Dictionary<string>;
            executeTransition(newValues, paneId, Transition.ToDialog, search => getId(key, search) !== dialogId);
        };

        helper.closeDialog = (paneId = 1) => {
            const key = `${dialog}${paneId}`;
            const newValues = _.zipObject([key], [null]) as _.Dictionary<string>;
            executeTransition(newValues, paneId, Transition.FromDialog, () => true);
        };

        helper.setObject = (resultObject: DomainObjectRepresentation, paneId = 1) => {
            const oid = resultObject.id();
            const key = `${object}${paneId}`;
            const newValues = _.zipObject([key], [oid]) as _.Dictionary<string>;
            executeTransition(newValues, paneId, Transition.ToObjectView, () => true);
        };

        helper.setList = (actionMember: ActionMember, paneId = 1) => {
            const newValues = {} as _.Dictionary<string>; 
            const parent = actionMember.parent;

            if (parent instanceof DomainObjectRepresentation) {
                newValues[`${object}${paneId}`] = parent.id();
            }

            if (parent instanceof MenuRepresentation) {
                newValues[`${menu}${paneId}`] = parent.menuId();
            }

            newValues[`${action}${paneId}`] = actionMember.actionId();
            newValues[`${page}${paneId}`] = "1";
            newValues[`${pageSize}${paneId}`] = defaultPageSize.toString();
            newValues[`${selected}${paneId}`] = "0";

            executeTransition(newValues, paneId, Transition.ToList, () => true);
        };

        helper.setProperty = (propertyMember: PropertyMember, paneId = 1) => {
            const href = propertyMember.value().link().href();
            const oid = getOidFromHref(href);
            const key = `${object}${paneId}`;
            const newValues = _.zipObject([key], [oid]) as _.Dictionary<string>;
            executeTransition(newValues, paneId, Transition.ToObjectView, () => true);
        };

        helper.setItem = (link: Link, paneId = 1) => {
            const href = link.href();
            const oid = getOidFromHref(href);
            const key = `${object}${paneId}`;
            const newValues = _.zipObject([key], [oid]) as _.Dictionary<string>;
            executeTransition(newValues, paneId, Transition.ToObjectView, () => true);
        }

        helper.toggleObjectMenu = (paneId = 1) => {      
            const key = actions + paneId;
            const actionsId = getSearch()[key] ? null : "open";
            const newValues = _.zipObject([key], [actionsId]) as _.Dictionary<string>;
            executeTransition(newValues, paneId, Transition.Null, () => true);
        };

        function checkAndSetValue(paneId : number,  check: (search : any) => boolean, set: (search : any) => void, reload : boolean) {
            currentPaneId = paneId;
            const search = getSearch();

            // only add field if matching dialog or dialog (to catch case when swapping panes) 
            if (check(search)) {
                set(search);
                setNewSearch(search);

                if (!reload) {
                    $location.replace();
                }
            }
        }

        helper.setFieldValue = (dialogId: string, p: Parameter, pv: Value, reload = true, paneId = 1) =>

            checkAndSetValue(paneId,
                search => getId(`${dialog}${paneId}`, search) === dialogId,
                search => setField(paneId, search, p, pv),
                reload);

        helper.setParameterValue = (actionId: string, p: Parameter, pv: Value, reload = true, paneId = 1) =>
      
            checkAndSetValue(paneId,
                search => getId(`${action}${paneId}`, search) === actionId,
                search => setParameter(paneId, search, p, pv),
                reload);
       

        helper.setPropertyValue = (obj: DomainObjectRepresentation, p: PropertyMember, pv: Value, reload = true, paneId = 1) => 
                   
            checkAndSetValue(paneId,
                search => {
                    // only add value if matching object (to catch case when swapping panes) 
                    // and only add to edit url
                    const oid = obj.id();
                    const currentOid = getId(`${object}${paneId}`, search);
                    const currentMode = getInteractionMode(getId(`${interactionMode}${paneId}`, search));
                    return currentOid === oid && currentMode !== InteractionMode.View;
                },
                search => setProperty(paneId, search, p, pv),
                reload);
       
     
        helper.setCollectionMemberState = (collectionMemberId: string, state: CollectionViewState, paneId = 1) => {
            const key = `${collection}${paneId}_${collectionMemberId}`;
            const newValues = _.zipObject([key], [CollectionViewState[state]]) as _.Dictionary<string>;
            executeTransition(newValues, paneId, Transition.Null, () => true);
        };

        helper.setListState = (state: CollectionViewState, paneId = 1) => {
            const key = `${collection}${paneId}`;
            const newValues = _.zipObject([key], [CollectionViewState[state]]) as _.Dictionary<string>;
            executeTransition(newValues, paneId, Transition.Null, () => true);
        };

        helper.setInteractionMode = (newMode: InteractionMode, paneId = 1) => {         
            const key = `${interactionMode}${paneId}`;
            const currentMode = getInteractionMode(getId(key, $routeParams));
            const transition = (currentMode === InteractionMode.Edit && newMode !== InteractionMode.Edit) ? Transition.LeaveEdit : Transition.Null;
            const newValues = _.zipObject([key], [InteractionMode[newMode]]) as _.Dictionary<string>;
            executeTransition(newValues, paneId, transition, () => true);
        };


        helper.setListItem = (item: number, isSelected: boolean, paneId = 1) => {
         
            const key = `${selected}${paneId}`;
            const currentSelected: number = parseInt(getSearch()[key] || 0);
            const selectedArray : boolean[] = arrayFromMask(currentSelected);
            selectedArray[item] = isSelected;
            const currentSelectedAsString = (createMask(selectedArray)).toString();
            const newValues = _.zipObject([key], [currentSelectedAsString]) as _.Dictionary<string>;
            executeTransition(newValues, paneId, Transition.Null, () => true);

            $location.replace();
        }

        helper.setListPaging = (newPage: number, newPageSize: number, state: CollectionViewState, paneId = 1) => {
            const pageValues = {} as _.Dictionary<string>;

            pageValues[`${page}${paneId}`] = newPage.toString();
            pageValues[`${pageSize}${paneId}`] = newPageSize.toString();
            pageValues[`${collection}${paneId}`] = CollectionViewState[state];
            pageValues[`${selected}${paneId}`] = "0"; // clear selection 

            executeTransition(pageValues, paneId, Transition.Null, () => true);
        };

        helper.setError = (errorCategory: ErrorCategory, ec?: ClientErrorCode | HttpStatusCode) => {
            const path = $location.path();
            const segments = path.split("/");
            const mode = segments[1];
            const newPath = `/${mode}/error`;
           
            const search = {}
            // always on pane 1
            search[errorCat + 1] = ErrorCategory[errorCategory];

            if (ec && errorCategory === ErrorCategory.HttpClientError) {
                search[errorCod + 1] = HttpStatusCode[ec];
            }
            else if (ec && errorCategory === ErrorCategory.ClientError) {
                search[errorCod + 1] = ClientErrorCode[ec];
            }

            search[errorCat + 1] = ErrorCategory[errorCategory];

            $location.path(newPath);
            setNewSearch(search);

            if (errorCategory ===  ErrorCategory.HttpClientError && ec === HttpStatusCode.PreconditionFailed) {
                // on concurrency fail replace url so we can't just go back
                $location.replace();
            }
        };


        helper.getRouteData = () => {
            const routeData = new RouteData();

            setPaneRouteData(routeData.pane1, 1);
            setPaneRouteData(routeData.pane2, 2);

            return routeData;
        };

        helper.pushUrlState = (paneId = 1) => {
            capturedPanes[paneId] = helper.getUrlState(paneId);
        }

        helper.getUrlState = (paneId = 1) => {
            currentPaneId = paneId;

            const path = $location.path();
            const segments = path.split("/");

            const paneType = segments[paneId + 1] || homePath;
            const paneSearch = capturePane(paneId);

            return { paneType: paneType, search: paneSearch };
        }

        helper.getListCacheIndex = (paneId: number, newPage: number, newPageSize: number, format? : CollectionViewState) => {
            const search = getSearch();
       
            const s1 = getId(`${menu}${paneId}`, search) || "";
            const s2 = getId(`${object}${paneId}`, search) || "";
            const s3 = getId(`${action}${paneId}`, search) || "";

            const parms = <_.Dictionary<string>>  _.pick(search, (v, k) => k.indexOf(parm + paneId) === 0);
            const mappedParms = _.mapValues(parms, v => decodeURIComponent( Decompress(v)));

            const s4 = _.reduce(mappedParms, (r, n, k) => r + (k + "=" + n + "-"), "");

            const s5 = `${newPage}`;
            const s6 = `${newPageSize}`;

            const s7 = format ? `${format}` : "";

            const ss = [s1, s2, s3, s4, s5, s6, s7] as string[];

            return _.reduce(ss, (r, n) => r + "-" + n, "");
        }

        helper.popUrlState = (paneId = 1) => {
            currentPaneId = paneId;

            const capturedPane = capturedPanes[paneId];

            if (capturedPane) {
                capturedPanes[paneId] = null;
                let search = clearPane(getSearch(), paneId);
                search = _.merge(search, capturedPane.search);
                setupPaneNumberAndTypes(paneId, capturedPane.paneType);
                setNewSearch(search);
            } else {
                // probably reloaded page so no state to pop. 
                // just go home 
                helper.setHome(paneId);
            }
        }

        helper.clearUrlState = (paneId: number) => {
            currentPaneId = paneId;
            capturedPanes[paneId] = null;
        }


        function swapSearchIds(search: any) {
            return _.mapKeys(search,
                (v, k: string) => k.replace(/(\D+)(\d{1})(\w*)/, (match, p1, p2, p3) => `${p1}${p2 === "1" ? "2" : "1"}${p3}`));
        }


        helper.swapPanes = () => {
            const path = $location.path();
            const segments = path.split("/");
            const [, mode, oldPane1, oldPane2 = homePath] = segments;
            const newPath = `/${mode}/${oldPane2}/${oldPane1}`;
            const search = swapSearchIds(getSearch());
            currentPaneId = currentPaneId === 1 ? 2 : 1;

            $location.path(newPath).search(search);
        }

        helper.cicero = () => {
            const newPath = `/${ciceroPath}/${$location.path().split("/")[2]}`;
            $location.path(newPath);
        }

        helper.currentpane = () => currentPaneId;

        helper.singlePane = (paneId = 1) => {
            currentPaneId = 1;

            if (!singlePane()) {
           
                const paneToKeepId = paneId;
                const paneToRemoveId = paneToKeepId === 1 ? 2 : 1;

                const path = $location.path();
                const segments = path.split("/");
                const mode = segments[1];
                const paneToKeep = segments[paneToKeepId + 1];            
                const newPath = `/${mode}/${paneToKeep}`;

                let search = getSearch();

                if (paneToKeepId === 1) {
                    // just remove second pane
                    search = clearPane(search, paneToRemoveId);
                }

                if (paneToKeepId === 2) {
                    // swap pane 2 to pane 1 then remove 2
                    search = swapSearchIds(search);
                    search = clearPane(search, 2);
                }

                $location.path(newPath).search(search);
            }
        }

        helper.isHome = (paneId = 1) => {
            const path = $location.path();
            const segments = path.split("/");
            return segments[paneId+1] === homePath; // e.g. segments 0=~/1=cicero/2=home/3=home
        }
    });
}