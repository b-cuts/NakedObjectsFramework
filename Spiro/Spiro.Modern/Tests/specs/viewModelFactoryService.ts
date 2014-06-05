﻿/// <reference path="../../Scripts/typings/jasmine/jasmine-1.3.d.ts" />
/// <reference path="../../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../Scripts/typings/angularjs/angular-mocks.d.ts" />
/// <reference path="../../Scripts/spiro.models.ts" />
/// <reference path="../../Scripts/spiro.angular.services.color.ts" />
/// <reference path="../../Scripts/spiro.angular.viewmodels.ts" />
/// <reference path="helpers.ts" />

describe('viewModelFactory Service', () => {

    beforeEach(module('app'));

   

    describe('create errorViewModel', () => {

        var resultVm: Spiro.Angular.ErrorViewModel;
        var rawError = { message: "a message", stackTrace: ["line1", "line2"] };
        var emptyError = {};

        describe('from populated rep', () => {
          
            beforeEach(inject((viewModelFactory: Spiro.Angular.IViewModelFactory) => {
                resultVm = viewModelFactory.errorViewModel(new Spiro.ErrorRepresentation(rawError));
            }));

            it('creates a error view model', () => {
                expect(resultVm.message).toBe("a message");
                expect(resultVm.stackTrace.length).toBe(2);
                expect(resultVm.stackTrace.pop()).toBe("line2");
                expect(resultVm.stackTrace.pop()).toBe("line1");
            });
        });

        describe('from empty rep', () => {
          

            beforeEach(inject((viewModelFactory: Spiro.Angular.IViewModelFactory) => {
                resultVm = viewModelFactory.errorViewModel(new Spiro.ErrorRepresentation(emptyError));
            }));

            it('creates a error view model', () => {
                expect(resultVm.message).toBe("An Error occurred");
                expect(resultVm.stackTrace.length).toBe(1);
                expect(resultVm.stackTrace.pop()).toBe("Empty");


            });
        });
    });

    describe('create linkViewModel', () => {

        var resultVm: Spiro.Angular.LinkViewModel;
        var rawLink = { title: "a title", href : "http://objects/AdventureWorksModel.Product/1" };
        var emptyLink = {};

        describe('from populated rep', () => {

            beforeEach(inject((viewModelFactory: Spiro.Angular.IViewModelFactory) => {
                resultVm = viewModelFactory.linkViewModel(new Spiro.Link(rawLink));
            }));

            it('creates a link view model', () => {
                expect(resultVm.title).toBe("a title");
                expect(resultVm.href).toBe("#/objects/AdventureWorksModel.Product/1");
                expect(resultVm.color).toBe("bg-color-orangeDark");
            });
        });


        describe('from empty rep', () => {

            beforeEach(inject((viewModelFactory: Spiro.Angular.IViewModelFactory) => {
                resultVm = viewModelFactory.linkViewModel(new Spiro.Link(emptyLink));
            }));

            it('creates a link view model', () => {
                expect(resultVm.title).toBeUndefined();
                expect(resultVm.href).toBe("");
                expect(resultVm.color).toBe("bg-color-darkBlue");
            });
        });
    });

    describe('create itemViewModel', () => {

        var resultVm: Spiro.Angular.ItemViewModel;
        var rawLink = { title: "a title", href: "http://objects/AdventureWorksModel.Product/1" };
        var emptyLink = {};

        describe('from populated rep', () => {

            beforeEach(inject((viewModelFactory: Spiro.Angular.IViewModelFactory) => {
                resultVm = viewModelFactory.itemViewModel(new Spiro.Link(rawLink), "http://objects/AdventureWorksModel.SalesOrderHeader/1");
            }));

            it('creates an item view model', () => {
                expect(resultVm.title).toBe("a title");
                expect(resultVm.href).toBe("#/objects/AdventureWorksModel.SalesOrderHeader/1?collectionItem=AdventureWorksModel.Product/1");
                expect(resultVm.color).toBe("bg-color-orangeDark");
            });
        });


        describe('from empty rep', () => {

            beforeEach(inject((viewModelFactory: Spiro.Angular.IViewModelFactory) => {
                resultVm = viewModelFactory.itemViewModel(new Spiro.Link(emptyLink), "");
            }));

            it('creates an item view model', () => {
                expect(resultVm.title).toBeUndefined();
                expect(resultVm.href).toBe("");
                expect(resultVm.color).toBe("bg-color-darkBlue");
            });
        });
    });

    describe('create actionViewModel', () => {

        var resultVm: Spiro.Angular.ActionViewModel;
        var rawdetailsLink = { rel: "urn:org.restfulobjects:rels/details", href: "http://objects/AdventureWorksModel.Product/1/actions/anaction"} 
        var rawAction = { extensions: {friendlyName : "a title"}, links : [rawdetailsLink] };
        

        describe('from populated rep', () => {

            beforeEach(inject((viewModelFactory: Spiro.Angular.IViewModelFactory) => {
                resultVm = viewModelFactory.actionViewModel(new Spiro.ActionMember(rawAction, {}));
            }));

            it('creates an action view model', () => {
                expect(resultVm.title).toBe("a title");
                expect(resultVm.href).toBe("#/objects/AdventureWorksModel.Product/1?action=anaction");
            });
        });

    });

    describe('create dialogViewModel', () => {

        var resultVm: Spiro.Angular.DialogViewModel;
        var rawInvokeLink = { rel: "urn:org.restfulobjects:rels/invoke", href: "http://objects/AdventureWorksModel.Product/1/actions/anaction" };
        var rawUpLink = { rel: "urn:org.restfulobjects:rels/up", href: "http://objects/AdventureWorksModel.Product/1" };

        var rawAction = { extensions: { friendlyName: "a title" }, links: [rawInvokeLink, rawUpLink] };

        describe('from simple rep', () => {

            beforeEach(inject((viewModelFactory: Spiro.Angular.IViewModelFactory, $routeParams) => {
                $routeParams.action = "";
                resultVm = viewModelFactory.dialogViewModel(new Spiro.ActionRepresentation(rawAction), () => {});
            }));

            it('creates a dialog view model', () => {
                expect(resultVm.title).toBe("a title");
                expect(resultVm.isQuery).toBe(false);
                expect(resultVm.message).toBe("");
                expect(resultVm.close).toBe("#/objects/AdventureWorksModel.Product/1");
                expect(resultVm.parameters.length).toBe(0);
                expect(resultVm.doShow).toBeTruthy();
                expect(resultVm.doInvoke).toBeTruthy();
            });
        });

    });



  
}); 