﻿// Copyright Naked Objects Group Ltd, 45 Station Road, Henley on Thames, UK, RG9 1AT
// Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. 
// You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
// Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and limitations under the License.

using System;
using System.Data.Entity.Core.Objects;
using System.Data.Entity.Core.Objects.DataClasses;
using System.Linq;
using AdventureWorksModel;
using NakedObjects.Core.Async;
using NakedObjects.Core.Configuration;
using NakedObjects.Persistor.Entity.Configuration;
using NakedObjects.Architecture.Menu;
using NakedObjects.Menu;

namespace NakedObjects.Batch {
    /// <summary>
    /// Use this class to configure the application running under Naked Objects
    /// </summary>
    public static class NakedObjectsRunSettings {
        //TODO: Add similar Configuration mechanisms for Authentication, Auditing
        //Any other simple configuration options (e.g. bool or string) on the old Run classes should be
        //moved onto a single SystemConfiguration, which can delegate e.g. to Web.config 

        private const string awModel = "AdventureWorksModel";

        private static string[] ModelNamespaces {
            get {
                return new string[] { awModel }; //Add top-level namespace(s) that cover the domain model
            }
        }

        private static Type[] Services {
            get {
                return new[] {
                    typeof (CustomerRepository),
                    typeof (OrderRepository),
                    typeof (ProductRepository),
                    typeof (EmployeeRepository),
                    typeof (SalesRepository),
                    typeof (SpecialOfferRepository),
                    typeof (ContactRepository),
                    typeof (VendorRepository),
                    typeof (PurchaseOrderRepository),
                    typeof (WorkOrderRepository),
                    typeof (OrderContributedActions),
                    typeof (CustomerContributedActions),
                    typeof (AsyncService)
                };
            }
        }

        /// <summary>
        /// Specify any types that need to be reflected-over by the framework and that
        /// will not be discovered via the services
        /// </summary>
        private static Type[] Types {
            get {
                return new[] {
                    typeof (EnumerableQuery<object>),
                    typeof (EntityCollection<object>),
                    typeof (ObjectQuery<object>)
                };
            }
        }

        private static Type[] AllPersistedTypesInMainModel() {
            var allTypes = AppDomain.CurrentDomain.GetAssemblies().Single(a => a.GetName().Name == awModel).GetTypes();
            return allTypes.Where(t => t.BaseType == typeof (AWDomainObject) && !t.IsAbstract).ToArray();
        }

        public static ReflectorConfiguration ReflectorConfig() {
            return new ReflectorConfiguration(Types, Services, ModelNamespaces, MainMenus);
        }

        public static EntityObjectStoreConfiguration EntityObjectStoreConfig() {
            var config = new EntityObjectStoreConfiguration();
            config.UsingEdmxContext("Model").AssociateTypes(AllPersistedTypesInMainModel);
            config.SpecifyTypesNotAssociatedWithAnyContext(() => new[] {typeof (AWDomainObject)});
            return config;
        }

        /// <summary>
        /// Return an array of IMenus (obtained via the factory, then configured) to
        /// specify the Main Menus for the application. If none are returned then
        /// the Main Menus will be derived automatically from the MenuServices.
        /// </summary>
        public static IMenu[] MainMenus(IMenuFactory factory) {
            return new IMenu[] {};
        }
    }
}