﻿module NakedObjects.Gemini.Test.Helpers {
    import PaneRouteData = Angular.Gemini.PaneRouteData;
    import INakedObjectsScope = Angular.INakedObjectsScope;
    import IHomePageRepresentation = NakedObjects.RoInterfaces.IHomePageRepresentation;
    import IListRepresentation = NakedObjects.RoInterfaces.IListRepresentation;
    import MenusViewModel = NakedObjects.Angular.Gemini.MenusViewModel;
    import IDomainObjectRepresentation = NakedObjects.RoInterfaces.IDomainObjectRepresentation;
    import IMenuRepresentation = NakedObjects.RoInterfaces.Custom.IMenuRepresentation;

    const homeRepresentation: IHomePageRepresentation = {
        links: [
            {
                rel: "self",
                method: "GET",
                type: "application/json; profile=\"urn:org.restfulobjects:repr-types/homepage\"; charset=utf-8",
                href: "http://nakedobjectsrodemo.azurewebsites.net/"
            },
            {
                rel: "urn:org.restfulobjects:rels/user",
                method: "GET",
                type: "application/json; profile =\"urn:org.restfulobjects:repr-types/user\"; charset=utf-8",
                href: "http://nakedobjectsrodemo.azurewebsites.net/user"
            },
            {
                rel: "urn:org.restfulobjects:rels/services",
                method: "GET",
                type: "application/ json; profile =\"urn:org.restfulobjects:repr-types/list\"; charset=utf-8; x-ro-element-type=\"System.Object\"",
                href: "http://nakedobjectsrodemo.azurewebsites.net/services"
            },
            {
                rel: "urn: org.restfulobjects:rels/menus",
                method: "GET",
                type: "application/json; profile=\"urn:org.restfulobjects:repr-types/list\"; charset=utf-8; x-ro-element-type=\"System.Object\"",
                href: "http://nakedobjectsrodemo.azurewebsites.net/menus"
            },
            {
                rel: "urn:org.restfulobjects:rels/version",
                method: "GET",
                type: "application/json; profile=\"urn:org.restfulobjects:repr-types/version\"; charset=utf-8",
                href: "http://nakedobjectsrodemo.azurewebsites.net/version"
            },
            {
                rel: "urn:org.restfulobjects:rels/domain-types",
                method: "GET",
                type: "application/json; profile=\"urn:org.restfulobjects:repr-types/type-list\"; charset= utf-8",
                href: "http://nakedobjectsrodemo.azurewebsites.net/domain-types"
            }
        ],
        extensions: {}
    }

    const menusRepresentation: IListRepresentation = {
        links: [
            {
                rel: "self",
                method: "GET",
                type: "application/json; profile=\"urn:org.restfulobjects:repr-types/list\"; charset=utf-8; x-ro-element-type=\"System.Object\"",
                href: "http://nakedobjectsrodemo.azurewebsites.net/services"
            },
            {
                rel: "up",
                method: "GET",
                type: "application/ json; profile =\"urn:org.restfulobjects:repr-types/homepage\"; charset=utf-8",
                href: "http://nakedobjectsrodemo.azurewebsites.net/"
            }
        ],
        extensions: {},
        value: [
            {
                title: "Customers",
                rel: "urn:org.restfulobjects:rels/menu;menuId=\"CustomerRepository\"",
                method: "GET",
                type: "application/json; profile=\"urn:org.restfulobjects:repr-types/menu\"; charset=utf-8",
                href: "http://nakedobjectsrodemo.azurewebsites.net/menus/CustomerRepository"
            },
            {
                title: "Orders",
                rel: "urn:org.restfulobjects:rels/menu;menuId=\"OrderRepository\"",
                method: "GET",
                type: "application/json; profile =\"urn:org.restfulobjects:repr-types/menu\"; charset=utf-8",
                href: "http://nakedobjectsrodemo.azurewebsites.net/menus/OrderRepository"
            },
            {
                title: "Products",
                rel: "urn:org.restfulobjects:rels/menu;menuId=\"ProductRepository\"",
                method: "GET",
                type: "application/json; profile=\"urn:org.restfulobjects:repr-types/menu\"; charset=utf-8",
                href: "http://nakedobjectsrodemo.azurewebsites.net/menus/ProductRepository"
            },
            {
                title: "Employees",
                rel: "urn:org.restfulobjects:rels/menu;menuId=\"EmployeeRepository\"",
                method: "GET",
                type: "application/json; profile=\"urn:org.restfulobjects:repr-types/menu\"; charset=utf-8",
                href: "http://nakedobjectsrodemo.azurewebsites.net/menus/EmployeeRepository"
            },
            {
                title: "Sales",
                rel: "urn:org.restfulobjects:rels/menu;menuId=\"SalesRepository\"",
                method: "GET",
                type: "application/json; profile=\"urn:org.restfulobjects:repr-types/menu\"; charset=utf-8",
                href: "http://nakedobjectsrodemo.azurewebsites.net/menus/SalesRepository"
            },
            {
                title: "Special Offers",
                rel: "urn:org.restfulobjects:rels/menu;menuId=\"SpecialOfferRepository\"",
                method: "GET",
                type: "application/json; profile=\"urn:org.restfulobjects:repr-types/menu\"; charset=utf-8",
                href: "http://nakedobjectsrodemo.azurewebsites.net/menus/SpecialOfferRepository"
            },
            {
                title: "Contacts",
                rel: "urn:org.restfulobjects:rels/menu;menuId=\"PersonRepository\"",
                method: "GET",
                type: "application/json; profile=\"urn:org.restfulobjects:repr-types/menu\"; charset=utf-8",
                href: "http://nakedobjectsrodemo.azurewebsites.net/menus/PersonRepository"
            },
            {
                title: "Vendors",
                rel: "urn:org.restfulobjects:rels/menu;menuId=\"VendorRepository\"",
                method: "GET",
                type: "application/json; profile=\"urn:org.restfulobjects:repr-types/menu\"; charset=utf-8",
                href: "http://nakedobjectsrodemo.azurewebsites.net/menus/VendorRepository"
            },
            {
                title: "Purchase Orders",
                rel: "urn: org.restfulobjects:rels/menu;menuId=\"PurchaseOrderRepository\"",
                method: "GET",
                type: "application/json; profile=\"urn:org.restfulobjects:repr-types/menu\"; charset=utf-8",
                href: "http://nakedobjectsrodemo.azurewebsites.net/menus/PurchaseOrderRepository"
            },
            {
                title: "Work Orders",
                rel: "urn:org.restfulobjects:rels/menu;menuId=\"WorkOrderRepository\"",
                method: "GET",
                type: "application/json; profile=\"urn:org.restfulobjects:repr-types/menu\"; charset=utf-8",
                href: "http://nakedobjectsrodemo.azurewebsites.net/menus/WorkOrderRepository"
            }
        ]
    }

    const vendorRepositoryMenuRepresentation: IMenuRepresentation = {
        title: "Vendors",
        menuId: "VendorRepository",
        links: [
            {
                rel: "self",
                method: "GET",
                type: "application/json; profile=\"urn:org.restfulobjects:repr-types/menu\"; charset=utf-8",
                href: "http://nakedobjectsrodemo.azurewebsites.net/menus/VendorRepository"
            }
        ],
        extensions: {},
        members: {
            AllVendorsWithWebAddresses: {
                parameters: {},
                memberType: "action",
                id: "AllVendorsWithWebAddresses",
                links: [
                    {
                        rel: "urn:org.restfulobjects:rels/details; action=\"AllVendorsWithWebAddresses\"",
                        method: "GET",
                        type: "application/json; profile =\"urn:org.restfulobjects:repr-types/object-action\"; charset=utf-8",
                        href: "http://nakedobjectsrodemo.azurewebsites.net/services/AdventureWorksModel.VendorRepository/actions/AllVendorsWithWebAddresses"
                    },
                    {
                        arguments: {},
                        rel: "urn:org.restfulobjects:rels/invoke;action=\"AllVendorsWithWebAddresses\"",
                        method: "GET",
                        type: "application/json; profile=\"urn:org.restfulobjects:repr-types/action-result\"; charset=utf-8",
                        href: "http://nakedobjectsrodemo.azurewebsites.net/services/AdventureWorksModel.VendorRepository/actions/AllVendorsWithWebAddresses/invoke"
                    },
                    {
                        rel: "urn: org.restfulobjects:rels/return-type",
                        method: "GET",
                        type: "application/json; profile=\"urn:org.restfulobjects:repr-types/domain-type\"; charset=utf-8",
                        href: "http://nakedobjectsrodemo.azurewebsites.net/domain-types/list"
                    },
                    {
                        rel: "urn:org.restfulobjects:rels/element-type",
                        method: "GET",
                        type: "application/ json; profile =\"urn:org.restfulobjects:repr-types/domain-type\"; charset=utf-8",
                        href: "http://nakedobjectsrodemo.azurewebsites.net/domain-types/AdventureWorksModel.Vendor"
                    },
                    {
                        rel: "describedby",
                        method: "GET",
                        type: "application/json; profile=\"urn:org.restfulobjects:repr-types/action-description\"; charset=utf-8",
                        href: "http://nakedobjectsrodemo.azurewebsites.net/domain-types/AdventureWorksModel.VendorRepository/actions/AllVendorsWithWebAddresses"
                    }
                ],
                extensions: {
                    friendlyName: "All Vendors With Web Addresses",
                    description: "",
                    hasParams: false,
                    memberOrder: 0,
                    returnType: "list",
                    elementType: "AdventureWorksModel.Vendor",
                    pluralName: "Vendors"
                }
            },
            FindVendorByAccountNumber: {
                parameters: {
                    accountNumber: {
                        links: [
                            {
                                rel: "describedby",
                                method: "GET",
                                type: "application/json; profile=\"urn:org.restfulobjects:repr-types/action-param-description\"; charset=utf-8",
                                href: "http://nakedobjectsrodemo.azurewebsites.net/domain-types/AdventureWorksModel.VendorRepository/actions/FindVendorByAccountNumber/params/accountNumber"
                            }
                        ],
                        extensions: {
                            friendlyName: "Account Number",
                            description: "",
                            optional: false,
                            returnType: "string",
                            format: "string",
                            maxLength: 0,
                            pattern: ""
                        }
                    }
                },
                memberType: "action",
                id: "FindVendorByAccountNumber",
                links: [
                    {
                        rel: "urn:org.restfulobjects:rels/details;action=\"FindVendorByAccountNumber\"",
                        method: "GET",
                        type: "application/json; profile=\"urn:org.restfulobjects:repr-types/object-action\"; charset=utf-8",
                        href: "http://nakedobjectsrodemo.azurewebsites.net/services/AdventureWorksModel.VendorRepository/actions/FindVendorByAccountNumber"
                    },
                    {
                        arguments: { accountNumber: { value: null } },
                        rel: "urn:org.restfulobjects:rels/invoke;action =\"FindVendorByAccountNumber\"",
                        method: "GET",
                        type: "application/json; profile=\"urn:org.restfulobjects:repr-types/action-result\"; charset=utf-8",
                        href: "http://nakedobjectsrodemo.azurewebsites.net/services/AdventureWorksModel.VendorRepository/actions/FindVendorByAccountNumber/invoke"
                    },
                    {
                        rel: "urn:org.restfulobjects:rels/return-type",
                        method: "GET",
                        type: "application/json; profile=\"urn:org.restfulobjects:repr-types/domain-type\"; charset=utf-8",
                        href: "http://nakedobjectsrodemo.azurewebsites.net/domain-types/AdventureWorksModel.Vendor"
                    },
                    {
                        rel: "describedby",
                        method: "GET",
                        type: "application/json; profile=\"urn:org.restfulobjects:repr-types/action-description\"; charset=utf-8",
                        href: "http://nakedobjectsrodemo.azurewebsites.net/domain-types/AdventureWorksModel.VendorRepository/actions/FindVendorByAccountNumber"
                    },
                    {
                        id: "accountNumber",
                        rel: "urn:org.restfulobjects:rels/action-param",
                        method: "GET",
                        type: "application/json; profile=\"urn:org.restfulobjects:repr-types/action-param-description\"; charset=utf-8",
                        href: "http://nakedobjectsrodemo.azurewebsites.net/domain-types/AdventureWorksModel.VendorRepository/actions/FindVendorByAccountNumber/params/accountNumber"
                    }
                ],
                extensions: {
                    friendlyName: "Find Vendor By Account Number",
                    description: "",
                    hasParams: true,
                    memberOrder: 0,
                    returnType: "AdventureWorksModel.Vendor"
                }
            },
            FindVendorByName: {
                parameters: {
                    name: {
                        links: [
                            {
                                rel: "describedby",
                                method: "GET",
                                type: "application/json; profile=\"urn:org.restfulobjects:repr-types/action-param-description\"; charset=utf-8",
                                href: "http://nakedobjectsrodemo.azurewebsites.net/domain-types/AdventureWorksModel.VendorRepository/actions/FindVendorByName/params/name"
                            }
                        ],
                        extensions: {
                            friendlyName: "Name",
                            description: "",
                            optional: false,
                            returnType: "string",
                            format: "string",
                            maxLength: 0,
                            pattern: ""
                        }
                    }
                },
                memberType: "action",
                id: "FindVendorByName",
                links: [
                    {
                        rel: "urn:org.restfulobjects:rels/details;action=\"FindVendorByName\"",
                        method: "GET",
                        type: "application/json; profile=\"urn:org.restfulobjects:repr-types/object-action\"; charset=utf-8",
                        href: "http://nakedobjectsrodemo.azurewebsites.net/services/AdventureWorksModel.VendorRepository/actions/FindVendorByName"
                    },
                    {
                        arguments: { name: { value: null } },
                        rel: "urn:org.restfulobjects:rels/invoke;action=\"FindVendorByName\"",
                        method: "GET",
                        type: "application/json; profile=\"urn:org.restfulobjects:repr-types/action-result \"; charset=utf-8",
                        href: "http://nakedobjectsrodemo.azurewebsites.net/services/AdventureWorksModel.VendorRepository/actions/FindVendorByName/invoke"
                    },
                    {
                        rel: "urn:org.restfulobjects:rels/return-type",
                        method: "GET",
                        type: "application/json; profile=\"urn:org.restfulobjects:repr-types/domain-type\"; charset=utf-8",
                        href: "http://nakedobjectsrodemo.azurewebsites.net/domain-types/list"
                    },
                    {
                        rel: "urn:org.restfulobjects:rels/element-type",
                        method: "GET",
                        type: "application/ json; profile=\"urn:org.restfulobjects:repr-types/domain-type\"; charset=utf-8",
                        href: "http://nakedobjectsrodemo.azurewebsites.net/domain-types/AdventureWorksModel.Vendor"
                    },
                    {
                        rel: "describedby",
                        method: "GET",
                        type: "application/ json; profile=\"urn:org.restfulobjects:repr-types/action-description\"; charset=utf-8",
                        href: "http://nakedobjectsrodemo.azurewebsites.net/domain-types/AdventureWorksModel.VendorRepository/actions/FindVendorByName"
                    },
                    {
                        id: "name",
                        rel: "urn:org.restfulobjects:rels/action-param",
                        method: "GET",
                        type: "application/json; profile=\"urn:org.restfulobjects:repr-types/action-param-description\"; charset=utf-8",
                        href: "http://nakedobjectsrodemo.azurewebsites.net/domain-types/AdventureWorksModel.VendorRepository/actions/FindVendorByName/params/name"
                    }
                ],
                extensions: {
                    friendlyName: "Find Vendor By Name",
                    description: "",
                    hasParams: true,
                    memberOrder: 0,
                    returnType: "list",
                    elementType: "AdventureWorksModel.Vendor",
                    pluralName: "Vendors"
                }
            },
            RandomVendor: {
                parameters: {},
                memberType: "action",
                id: "RandomVendor",
                links: [
                    {
                        rel: "urn:org.restfulobjects:rels/details;action=\"RandomVendor\"",
                        method: "GET",
                        type: "application/json; profile=\"urn:org.restfulobjects:repr-types/object-action\"; charset=utf-8",
                        href: "http://nakedobjectsrodemo.azurewebsites.net/services/AdventureWorksModel.VendorRepository/actions/RandomVendor"
                    },
                    {
                        arguments: {},
                        rel: "urn:org.restfulobjects:rels/invoke;action=\"RandomVendor\"",
                        method: "GET",
                        type: "application/json; profile=\"urn:org.restfulobjects:repr-types/action-result\"; charset=utf-8",
                        href: "http://nakedobjectsrodemo.azurewebsites.net/services/AdventureWorksModel.VendorRepository/actions/RandomVendor/invoke"
                    },
                    {
                        rel: "urn:org.restfulobjects:rels/return-type",
                        method: "GET",
                        type: "application/json; profile=\"urn:org.restfulobjects:repr-types/domain-type\"; charset=utf-8",
                        href: "http://nakedobjectsrodemo.azurewebsites.net/domain-types/AdventureWorksModel.Vendor"
                    },
                    {
                        rel: "describedby",
                        method: "GET",
                        type: "application/json; profile=\"urn:org.restfulobjects:repr-types/action-description\"; charset=utf-8",
                        href: "http://nakedobjectsrodemo.azurewebsites.net/domain-types/AdventureWorksModel.VendorRepository/actions/RandomVendor"
                    }
                ],
                extensions: {
                    friendlyName: "Random Vendor",
                    description: "",
                    hasParams: false,
                    memberOrder: 0,
                    returnType: "AdventureWorksModel.Vendor"
                }
            }
        }
    }

    const vendorObjectRepresentation  = {
        instanceId: "1634",
        domainType: "AdventureWorksModel.Vendor",
        title: "GMA Ski & Bike",
        links: [
            {
                rel: "self",
                method: "GET",
                type: "application/json; profile=\"urn:org.restfulobjects:repr-types/object\"; charset=utf-8; x-ro-domain-type=\"AdventureWorksModel.Vendor\"",
                href: "http://nakedobjectsrodemo.azurewebsites.net/objects/AdventureWorksModel.Vendor/1634"
            },
            {
                rel: "describedby",
                method: "GET",
                type: "application/json; profile=\"urn:org.restfulobjects:repr-types/domain-type\"; charset=utf-8",
                href: "http://nakedobjectsrodemo.azurewebsites.net/domain-types/AdventureWorksModel.Vendor"
            },
            {
                arguments: {
                    AccountNumber: { value: null },
                    Name: { value: null },
                    CreditRating: { value: null },
                    PreferredVendorStatus: { value: null },
                    ActiveFlag: { value: null },
                    PurchasingWebServiceURL: { value: null }
                },
                rel: "urn:org.restfulobjects:rels/update",
                method: "PUT",
                type: "application/json; profile=\"urn:org.restfulobjects:repr-types/object\"; charset=utf-8; x-ro-domain-type=\"AdventureWorksModel.Vendor\"",
                href: "http://nakedobjectsrodemo.azurewebsites.net/objects/AdventureWorksModel.Vendor/1634"
            }
        ],
        extensions: {
            friendlyName: "Vendor",
            description: "",
            pluralName: "Vendors",
            domainType: "AdventureWorksModel.Vendor",
            isService: false
        },
        members: {
            AccountNumber: {
                value: "GMASKI0001",
                hasChoices: false,
                memberType: "property",
                id: "AccountNumber",
                links: [
                    {
                        rel: "urn:org.restfulobjects:rels/details;property=\"AccountNumber\"",
                        method: "GET",
                        type: "application/json; profile=\"urn:org.restfulobjects:repr-types/object-property\"; charset=utf-8",
                        href: "http://nakedobjectsrodemo.azurewebsites.net/objects/AdventureWorksModel.Vendor/1634/properties/AccountNumber"
                    },
                    {
                        rel: "describedby",
                        method: "GET",
                        type: "application/json; profile=\"urn:org.restfulobjects:repr-types/property-description\"; charset=utf-8",
                        href: "http://nakedobjectsrodemo.azurewebsites.net/domain-types/AdventureWorksModel.Vendor/properties/AccountNumber"
                    },
                    {
                        arguments: { value: null },
                        rel: "urn:org.restfulobjects:rels/modify;property=\"AccountNumber\"",
                        method: "PUT",
                        type: "application/json; profile=\"urn:org.restfulobjects:repr-types/object-property\"; charset=utf-8",
                        href: "http://nakedobjectsrodemo.azurewebsites.net/objects/AdventureWorksModel.Vendor/1634/properties/AccountNumber"
                    }
                ],
                extensions: {
                    friendlyName: "Account Number",
                    description: "",
                    optional: false,
                    memberOrder: 10,
                    returnType: "string",
                    format: "string",
                    maxLength: 0,
                    pattern: ""
                }
            },
            "Name": {
                value: "GMA Ski & Bike",
                hasChoices: false,
                memberType: "property",
                id: "Name",
                links: [
                    {
                        rel: "urn:org.restfulobjects:rels/details;property=\"Name\"",
                        method: "GET",
                        type: "application/json; profile=\"urn:org.restfulobjects:repr-types/object-property\"; charset=utf-8",
                        href: "http://nakedobjectsrodemo.azurewebsites.net/objects/AdventureWorksModel.Vendor/1634/properties/Name"
                    },
                    {
                        rel: "describedby",
                        method: "GET",
                        type: "application/json; profile=\"urn:org.restfulobjects:repr-types/property-description\"; charset=utf-8",
                        href: "http://nakedobjectsrodemo.azurewebsites.net/domain-types/AdventureWorksModel.Vendor/properties/Name"
                    },
                    {
                        arguments: { value: null },
                        rel: "urn:org.restfulobjects:rels/modify;property=\"Name\"",
                        method: "PUT",
                        type: "application/json; profile=\"urn:org.restfulobjects:repr-types/object-property\"; charset=utf-8",
                        href: "http://nakedobjectsrodemo.azurewebsites.net/objects/AdventureWorksModel.Vendor/1634/properties/Name"
                    }
                ],
                extensions: {
                    friendlyName: "Name",
                    description: "",
                    optional: false,
                    memberOrder: 20,
                    returnType: "string",
                    format: "string",
                    maxLength: 0,
                    pattern: ""
                }
            },
            CreditRating: {
                value: 1,
                hasChoices: false,
                memberType: "property",
                id: "CreditRating",
                links: [
                    {
                        rel: "urn:org.restfulobjects:rels/details;property=\"CreditRating\"",
                        method: "GET",
                        type: "application/json; profile=\"urn:org.restfulobjects:repr-types/object-property\"; charset=utf-8",
                        href: "http://nakedobjectsrodemo.azurewebsites.net/objects/AdventureWorksModel.Vendor/1634/properties/CreditRating"
                    },
                    {
                        rel: "describedby",
                        method: "GET",
                        type: "application/json; profile=\"urn:org.restfulobjects:repr-types/property-description\"; charset=utf-8",
                        href: "http://nakedobjectsrodemo.azurewebsites.net/domain-types/AdventureWorksModel.Vendor/properties/CreditRating"
                    },
                    {
                        arguments: { value: null },
                        rel: "urn:org.restfulobjects:rels/modify;property=\"CreditRating\"",
                        method: "PUT",
                        type: "application/json; profile=\"urn:org.restfulobjects:repr-types/object-property\"; charset=utf-8",
                        href: "http://nakedobjectsrodemo.azurewebsites.net/objects/AdventureWorksModel.Vendor/1634/properties/CreditRating"
                    }
                ],
                extensions: {
                    friendlyName: "Credit Rating",
                    description: "",
                    optional: false,
                    memberOrder: 30,
                    returnType: "number",
                    format: "integer"
                }
            },
            PreferredVendorStatus: {
                value: true,
                hasChoices: false,
                memberType: "property",
                id: "PreferredVendorStatus",
                links: [
                    {
                        rel: "urn:org.restfulobjects:rels/details;property=\"PreferredVendorStatus\"",
                        method: "GET",
                        type: "application/json; profile=\"urn:org.restfulobjects:repr-types/object-property\"; charset=utf-8",
                        href: "http://nakedobjectsrodemo.azurewebsites.net/objects/AdventureWorksModel.Vendor/1634/properties/PreferredVendorStatus"
                    },
                    {
                        rel: "describedby",
                        method: "GET",
                        type: "application/json; profile=\"urn:org.restfulobjects:repr-types/property-description\"; charset=utf-8",
                        href: "http://nakedobjectsrodemo.azurewebsites.net/domain-types/AdventureWorksModel.Vendor/properties/PreferredVendorStatus"
                    },
                    {
                        arguments: { value: null },
                        rel: "urn:org.restfulobjects:rels/modify;property=\"PreferredVendorStatus\"",
                        method: "PUT",
                        type: "application/json; profile=\"urn:org.restfulobjects:repr-types/object-property\"; charset=utf-8",
                        href: "http://nakedobjectsrodemo.azurewebsites.net/objects/AdventureWorksModel.Vendor/1634/properties/PreferredVendorStatus"
                    }
                ],
                extensions: {
                    friendlyName: "Preferred Vendor Status",
                    description: "",
                    optional: false,
                    memberOrder: 40,
                    returnType: "boolean"
                }
            },
            ActiveFlag: {
                value: true,
                hasChoices: false,
                memberType: "property",
                id: "ActiveFlag",
                links: [
                    {
                        rel: "urn:org.restfulobjects:rels/details;property=\"ActiveFlag\"",
                        method: "GET",
                        type: "application/json; profile=\"urn:org.restfulobjects:repr-types/object-property\"; charset=utf-8",
                        href: "http://nakedobjectsrodemo.azurewebsites.net/objects/AdventureWorksModel.Vendor/1634/properties/ActiveFlag"
                    },
                    {
                        rel: "describedby",
                        method: "GET",
                        type: "application/json; profile=\"urn:org.restfulobjects:repr-types/property-description\"; charset=utf-8",
                        href: "http://nakedobjectsrodemo.azurewebsites.net/domain-types/AdventureWorksModel.Vendor/properties/ActiveFlag"
                    },
                    {
                        arguments: { value: null },
                        rel: "urn:org.restfulobjects:rels/modify;property=\"ActiveFlag\"",
                        method: "PUT",
                        type: "application/json; profile=\"urn:org.restfulobjects:repr-types/object-property\"; charset=utf-8",
                        href: "http://nakedobjectsrodemo.azurewebsites.net/objects/AdventureWorksModel.Vendor/1634/properties/ActiveFlag"
                    }
                ],
                extensions: {
                    friendlyName: "Active Flag",
                    description: "",
                    optional: false,
                    memberOrder: 50,
                    returnType: "boolean"
                }
            },
            PurchasingWebServiceURL: {
                value: null,
                hasChoices: false,
                memberType: "property",
                id: "PurchasingWebServiceURL",
                links: [
                    {
                        rel: "urn:org.restfulobjects:rels/details;property=\"PurchasingWebServiceURL\"",
                        method: "GET",
                        type: "application/json; profile=\"urn:org.restfulobjects:repr-types/object-property\"; charset=utf-8",
                        href: "http://nakedobjectsrodemo.azurewebsites.net/objects/AdventureWorksModel.Vendor/1634/properties/PurchasingWebServiceURL"
                    },
                    {
                        rel: "describedby",
                        method: "GET",
                        type: "application/json; profile=\"urn:org.restfulobjects:repr-types/property-description\"; charset=utf-8",
                        href: "http://nakedobjectsrodemo.azurewebsites.net/domain-types/AdventureWorksModel.Vendor/properties/PurchasingWebServiceURL"
                    },
                    {
                        arguments: { value: null },
                        rel: "urn:org.restfulobjects:rels/modify;property=\"PurchasingWebServiceURL\"",
                        method: "PUT",
                        type: "application/json; profile=\"urn:org.restfulobjects:repr-types/object-property\"; charset=utf-8",
                        href: "http://nakedobjectsrodemo.azurewebsites.net/objects/AdventureWorksModel.Vendor/1634/properties/PurchasingWebServiceURL"
                    },
                    {
                        rel: "urn:org.restfulobjects:rels/clear;property=\"PurchasingWebServiceURL\"",
                        method: "DELETE",
                        type: "application/json; profile=\"urn:org.restfulobjects:repr-types/object-property\"; charset=utf-8",
                        href: "http://nakedobjectsrodemo.azurewebsites.net/objects/AdventureWorksModel.Vendor/1634/properties/PurchasingWebServiceURL"
                    }
                ],
                extensions: {
                    friendlyName: "Purchasing Web Service URL",
                    description: "",
                    optional: true,
                    memberOrder: 60,
                    returnType: "string",
                    format: "string",
                    maxLength: 0,
                    pattern: ""
                }
            },
            ModifiedDate: {
                disabledReason: "Field not editable",
                value: "2005-06-09T00:00:00Z",
                hasChoices: false,
                memberType: "property",
                id: "ModifiedDate",
                links: [
                    {
                        rel: "urn:org.restfulobjects:rels/details;property=\"ModifiedDate\"",
                        method: "GET",
                        type: "application/json; profile=\"urn:org.restfulobjects:repr-types/object-property\"; charset=utf-8",
                        href: "http://nakedobjectsrodemo.azurewebsites.net/objects/AdventureWorksModel.Vendor/1634/properties/ModifiedDate"
                    },
                    {
                        rel: "describedby",
                        method: "GET",
                        type: "application/json; profile=\"urn:org.restfulobjects:repr-types/property-description\"; charset=utf-8",
                        href: "http://nakedobjectsrodemo.azurewebsites.net/domain-types/AdventureWorksModel.Vendor/properties/ModifiedDate"
                    }
                ],
                extensions: {
                    friendlyName: "Modified Date",
                    description: "",
                    optional: false,
                    memberOrder: 99,
                    returnType: "string",
                    format: "date-time",
                    maxLength: 0,
                    pattern: ""
                }
            },
            Products: {
                disabledReason: "Field not editable",
                size: 0,
                value: [],
                memberType: "collection",
                id: "Products",
                links: [
                    {
                        rel: "urn:org.restfulobjects:rels/collection-value;collection=\"Products\"",
                        method: "GET",
                        type: "application/json; profile=\"urn:org.restfulobjects:repr-types/collection-value\"; charset=utf-8",
                        href: "http://nakedobjectsrodemo.azurewebsites.net/objects/AdventureWorksModel.Vendor/1634/collections/Products/value"
                    },
                    {
                        rel: "urn:org.restfulobjects:rels/details;collection=\"Products\"",
                        method: "GET",
                        type: "application/json; profile=\"urn:org.restfulobjects:repr-types/object-collection\"; charset=utf-8; x-ro-element-type=\"AdventureWorksModel.ProductVendor\"",
                        href: "http://nakedobjectsrodemo.azurewebsites.net/objects/AdventureWorksModel.Vendor/1634/collections/Products"
                    },
                    {
                        rel: "describedby",
                        method: "GET",
                        type: "application/json; profile=\"urn:org.restfulobjects:repr-types/collection-description\"; charset=utf-8",
                        href: "http://nakedobjectsrodemo.azurewebsites.net/domain-types/AdventureWorksModel.Vendor/collections/Products"
                    }
                ],
                extensions: {
                    friendlyName: "Product - Order Info",
                    description: "",
                    memberOrder: 0,
                    returnType: "list",
                    elementType: "AdventureWorksModel.ProductVendor",
                    pluralName: "Product Vendors"
                }
            },
            "CreateNewContact": {
                parameters: {},
                memberType: "action",
                id: "CreateNewContact",
                links: [
                    {
                        rel: "urn:org.restfulobjects:rels/details;action=\"CreateNewContact\"",
                        method: "GET",
                        type: "application/json; profile=\"urn:org.restfulobjects:repr-types/object-action\"; charset=utf-8",
                        href: "http://nakedobjectsrodemo.azurewebsites.net/objects/AdventureWorksModel.Vendor/1634/actions/CreateNewContact"
                    },
                    {
                        arguments: {},
                        rel: "urn:org.restfulobjects:rels/invoke;action=\"CreateNewContact\"",
                        method: "POST",
                        type: "application/json; profile=\"urn:org.restfulobjects:repr-types/action-result\"; charset=utf-8",
                        href: "http://nakedobjectsrodemo.azurewebsites.net/objects/AdventureWorksModel.Vendor/1634/actions/CreateNewContact/invoke"
                    },
                    {
                        rel: "urn:org.restfulobjects:rels/return-type",
                        method: "GET",
                        type: "application/json; profile=\"urn:org.restfulobjects:repr-types/domain-type\"; charset=utf-8",
                        href: "http://nakedobjectsrodemo.azurewebsites.net/domain-types/AdventureWorksModel.Person"
                    },
                    {
                        rel: "describedby",
                        method: "GET",
                        type: "application/json; profile=\"urn:org.restfulobjects:repr-types/action-description\"; charset=utf-8",
                        href: "http://nakedobjectsrodemo.azurewebsites.net/domain-types/AdventureWorksModel.Vendor/actions/CreateNewContact"
                    }
                ],
                extensions: {
                    friendlyName: "Create New Contact",
                    description: "",
                    hasParams: false,
                    memberOrder: 0,
                    returnType: "AdventureWorksModel.Person"
                }
            },
            CreateNewPurchaseOrder: {
                parameters: {},
                memberType: "action",
                id: "CreateNewPurchaseOrder",
                links: [
                    {
                        rel: "urn:org.restfulobjects:rels/details;action=\"CreateNewPurchaseOrder\"",
                        method: "GET",
                        type: "application/json; profile=\"urn:org.restfulobjects:repr-types/object-action\"; charset=utf-8",
                        href: "http://nakedobjectsrodemo.azurewebsites.net/objects/AdventureWorksModel.Vendor/1634/actions/CreateNewPurchaseOrder"
                    },
                    {
                        arguments: {},
                        rel: "urn:org.restfulobjects:rels/invoke;action=\"CreateNewPurchaseOrder\"",
                        method: "POST",
                        type: "application/json; profile=\"urn:org.restfulobjects:repr-types/action-result\"; charset=utf-8",
                        href: "http://nakedobjectsrodemo.azurewebsites.net/objects/AdventureWorksModel.Vendor/1634/actions/CreateNewPurchaseOrder/invoke"
                    },
                    {
                        rel: "urn:org.restfulobjects:rels/return-type",
                        method: "GET",
                        type: "application/json; profile=\"urn:org.restfulobjects:repr-types/domain-type\"; charset=utf-8",
                        href: "http://nakedobjectsrodemo.azurewebsites.net/domain-types/AdventureWorksModel.PurchaseOrderHeader"
                    },
                    {
                        rel: "describedby",
                        method: "GET",
                        type: "application/json; profile=\"urn:org.restfulobjects:repr-types/action-description\"; charset=utf-8",
                        href: "http://nakedobjectsrodemo.azurewebsites.net/domain-types/AdventureWorksModel.Vendor/actions/CreateNewPurchaseOrder"
                    }
                ],
                extensions: {
                    friendlyName: "Create New Purchase Order",
                    description: "",
                    hasParams: false,
                    memberOrder: 0,
                    returnType: "AdventureWorksModel.PurchaseOrderHeader"
                }
            },
            ListPurchaseOrders: {
                parameters: {
                    fromDate: {
                        links: [
                            {
                                rel: "describedby",
                                method: "GET",
                                type: "application/json; profile=\"urn:org.restfulobjects:repr-types/action-param-description\"; charset=utf-8",
                                href: "http://nakedobjectsrodemo.azurewebsites.net/domain-types/AdventureWorksModel.Vendor/actions/ListPurchaseOrders/params/fromDate"
                            }
                        ],
                        extensions: {
                            friendlyName: "From Date",
                            description: "",
                            optional: false,
                            returnType: "string",
                            format: "date-time",
                            maxLength: 0,
                            pattern: ""
                        }
                    },
                    toDate: {
                        links: [
                            {
                                rel: "describedby",
                                method: "GET",
                                type: "application/json; profile=\"urn:org.restfulobjects:repr-types/action-param-description\"; charset=utf-8",
                                href: "http://nakedobjectsrodemo.azurewebsites.net/domain-types/AdventureWorksModel.Vendor/actions/ListPurchaseOrders/params/toDate"
                            }
                        ],
                        extensions: {
                            friendlyName: "To Date",
                            description: "",
                            optional: false,
                            returnType: "string",
                            format: "date-time",
                            maxLength: 0,
                            pattern: ""
                        }
                    }
                },
                memberType: "action",
                id: "ListPurchaseOrders",
                links: [
                    {
                        rel: "urn:org.restfulobjects:rels/details;action=\"ListPurchaseOrders\"",
                        method: "GET",
                        type: "application/json; profile=\"urn:org.restfulobjects:repr-types/object-action\"; charset=utf-8",
                        href: "http://nakedobjectsrodemo.azurewebsites.net/objects/AdventureWorksModel.Vendor/1634/actions/ListPurchaseOrders"
                    },
                    {
                        arguments: {
                            fromDate: { value: null },
                            toDate: { value: null }
                        },
                        rel: "urn:org.restfulobjects:rels/invoke;action=\"ListPurchaseOrders\"",
                        method: "GET",
                        type: "application/json; profile=\"urn:org.restfulobjects:repr-types/action-result\"; charset=utf-8",
                        href: "http://nakedobjectsrodemo.azurewebsites.net/objects/AdventureWorksModel.Vendor/1634/actions/ListPurchaseOrders/invoke"
                    },
                    {
                        rel: "urn:org.restfulobjects:rels/return-type",
                        method: "GET",
                        type: "application/json; profile=\"urn:org.restfulobjects:repr-types/domain-type\"; charset=utf-8",
                        href: "http://nakedobjectsrodemo.azurewebsites.net/domain-types/list"
                    },
                    {
                        rel: "urn:org.restfulobjects:rels/element-type",
                        method: "GET",
                        type: "application/json; profile=\"urn:org.restfulobjects:repr-types/domain-type\"; charset=utf-8",
                        href: "http://nakedobjectsrodemo.azurewebsites.net/domain-types/AdventureWorksModel.PurchaseOrderHeader"
                    },
                    {
                        rel: "describedby",
                        method: "GET",
                        type: "application/json; profile=\"urn:org.restfulobjects:repr-types/action-description\"; charset=utf-8",
                        href: "http://nakedobjectsrodemo.azurewebsites.net/domain-types/AdventureWorksModel.Vendor/actions/ListPurchaseOrders"
                    },
                    {
                        id: "fromDate",
                        rel: "urn:org.restfulobjects:rels/action-param",
                        method: "GET",
                        type: "application/json; profile=\"urn:org.restfulobjects:repr-types/action-param-description\"; charset=utf-8",
                        href: "http://nakedobjectsrodemo.azurewebsites.net/domain-types/AdventureWorksModel.Vendor/actions/ListPurchaseOrders/params/fromDate"
                    },
                    {
                        id: "toDate",
                        rel: "urn:org.restfulobjects:rels/action-param",
                        method: "GET",
                        type: "application/json; profile=\"urn:org.restfulobjects:repr-types/action-param-description\"; charset=utf-8",
                        href: "http://nakedobjectsrodemo.azurewebsites.net/domain-types/AdventureWorksModel.Vendor/actions/ListPurchaseOrders/params/toDate"
                    }
                ],
                extensions: {
                    friendlyName: "List Purchase Orders",
                    description: "",
                    hasParams: true,
                    memberOrder: 0,
                    returnType: "list",
                    elementType: "AdventureWorksModel.PurchaseOrderHeader",
                    pluralName: "Purchase Order Headers"
                }
            },
            OpenPurchaseOrdersForVendor: {
                parameters: {},
                memberType: "action",
                id: "OpenPurchaseOrdersForVendor",
                links: [
                    {
                        rel: "urn:org.restfulobjects:rels/details;action=\"OpenPurchaseOrdersForVendor\"",
                        method: "GET",
                        type: "application/json; profile=\"urn:org.restfulobjects:repr-types/object-action\"; charset=utf-8",
                        href: "http://nakedobjectsrodemo.azurewebsites.net/objects/AdventureWorksModel.Vendor/1634/actions/OpenPurchaseOrdersForVendor"
                    },
                    {
                        arguments: {},
                        rel: "urn:org.restfulobjects:rels/invoke;action=\"OpenPurchaseOrdersForVendor\"",
                        method: "GET",
                        type: "application/json; profile=\"urn:org.restfulobjects:repr-types/action-result\"; charset=utf-8",
                        href: "http://nakedobjectsrodemo.azurewebsites.net/objects/AdventureWorksModel.Vendor/1634/actions/OpenPurchaseOrdersForVendor/invoke"
                    },
                    {
                        rel: "urn:org.restfulobjects:rels/return-type",
                        method: "GET",
                        type: "application/json; profile=\"urn:org.restfulobjects:repr-types/domain-type\"; charset=utf-8",
                        href: "http://nakedobjectsrodemo.azurewebsites.net/domain-types/list"
                    },
                    {
                        rel: "urn:org.restfulobjects:rels/element-type",
                        method: "GET",
                        type: "application/json; profile=\"urn:org.restfulobjects:repr-types/domain-type\"; charset=utf-8",
                        href: "http://nakedobjectsrodemo.azurewebsites.net/domain-types/AdventureWorksModel.PurchaseOrderHeader"
                    },
                    {
                        rel: "describedby",
                        method: "GET",
                        type: "application/json; profile=\"urn:org.restfulobjects:repr-types/action-description\"; charset=utf-8",
                        href: "http://nakedobjectsrodemo.azurewebsites.net/domain-types/AdventureWorksModel.Vendor/actions/OpenPurchaseOrdersForVendor"
                    }
                ],
                extensions: {
                    friendlyName: "Open Purchase Orders For Vendor",
                    description: "",
                    hasParams: false,
                    memberOrder: 0,
                    returnType: "list",
                    elementType: "AdventureWorksModel.PurchaseOrderHeader",
                    pluralName: "Purchase Order Headers"
                }
            }
        }
    }

    let homeRequestHandler: ng.mock.IRequestHandler;
    let menusRequestHandler: ng.mock.IRequestHandler;
    let vendorRepositoryMenuRequestHandler: ng.mock.IRequestHandler;
    let vendorDomainObjectRequestHandler: ng.mock.IRequestHandler;

    export function setupBackend($httpBackend: ng.IHttpBackendService) {
        // backend definition common for all tests
        const root = "http://nakedobjectsrodemo.azurewebsites.net";
        homeRequestHandler = $httpBackend.when("GET", root);
        homeRequestHandler.respond(homeRepresentation);
        menusRequestHandler = $httpBackend.when("GET", root + "/menus");
        menusRequestHandler.respond(menusRepresentation);
        vendorRepositoryMenuRequestHandler = $httpBackend.when("GET", root + "/menus/VendorRepository");
        vendorRepositoryMenuRequestHandler.respond(vendorRepositoryMenuRepresentation);
        vendorDomainObjectRequestHandler = $httpBackend.when("GET", root + "/objects/AdventureWorksModel.Vendor/1634");
        vendorDomainObjectRequestHandler.respond(vendorObjectRepresentation);
    }

}