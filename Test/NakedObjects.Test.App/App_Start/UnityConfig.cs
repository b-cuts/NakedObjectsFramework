using System;
using System.Linq;
using System.Security.Principal;
using System.Web;
using AdventureWorksModel;
using Microsoft.Practices.Unity;
using NakedObjects.Architecture.Facets;
using NakedObjects.Architecture.Persist;
using NakedObjects.Architecture.Reflect;
using NakedObjects.Architecture.Security;
using NakedObjects.Core.Adapter.Map;
using NakedObjects.Core.Context;
using NakedObjects.Core.Reflect;
using NakedObjects.Core.Security;
using NakedObjects.EntityObjectStore;
using NakedObjects.Objects;
using NakedObjects.Persistor;
using NakedObjects.Persistor.Objectstore;
using NakedObjects.Reflector.DotNet;
using NakedObjects.Reflector.DotNet.Facets;
using NakedObjects.Reflector.DotNet.Reflect;
using NakedObjects.Reflector.DotNet.Reflect.Strategy;
using NakedObjects.Service;
using NakedObjects.Surface;
using NakedObjects.Surface.Nof4.Implementation;
using NakedObjects.Surface.Nof4.Utility;
using NakedObjects.Web.Mvc.Helpers;

namespace NakedObjects.Mvc.App.App_Start
{
    /// <summary>
    /// Specifies the Unity configuration for the main container.
    /// </summary>
    public class UnityConfig
    {
        #region Unity Container
        private static Lazy<IUnityContainer> container = new Lazy<IUnityContainer>(() =>
        {
            var container = new UnityContainer();
            RegisterTypes(container);
            return container;
        });

        /// <summary>
        /// Gets the configured Unity container.
        /// </summary>
        public static IUnityContainer GetConfiguredContainer()
        {
            return container.Value;
        }
        #endregion

        private static Type[] AdventureWorksTypes() {
            var allTypes = AppDomain.CurrentDomain.GetAssemblies().Single(a => a.GetName().Name == "AdventureWorksModel").GetTypes();
            return allTypes.Where(t => t.BaseType == typeof(AWDomainObject) && !t.IsAbstract).ToArray();
        }


        public static Type[] Services() {
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
                typeof(OrderContributedActions),
                typeof(CustomerContributedActions)
            };
        }

        private static object[] MenuServices {
            get {
                return new object[] {
                    new CustomerRepository(),
                    new OrderRepository(),
                    new ProductRepository(),
                    new EmployeeRepository(),
                    new SalesRepository(),
                    new SpecialOfferRepository(),
                    new ContactRepository(),
                    new VendorRepository(),
                    new PurchaseOrderRepository(),
                    new WorkOrderRepository()
                };
            }
        }

        private static object[] ContributedActions {
            get {
                return new object[] {
                    new OrderContributedActions(),
                    new CustomerContributedActions()
                };
            }
        }

        private static object[] SystemServices {
            get {
                return new object[] {
                    new SimpleEncryptDecrypt()
                };
            }
        }


        /// <summary>Registers the type mappings with the Unity container.</summary>
        /// <param name="container">The unity container to configure.</param>
        /// <remarks>There is no need to register concrete types such as controllers or API controllers (unless you want to 
        /// change the defaults), as Unity allows resolving a concrete type even if it was not previously registered.</remarks>
        public static void RegisterTypes(IUnityContainer container)
        {
           
            container.RegisterType<IClassStrategy, DefaultClassStrategy>();
            container.RegisterType<IFacetFactorySet, FacetFactorySetImpl>();
            container.RegisterType<INakedObjectReflector, DotNetReflector>(new ContainerControlledLifetimeManager());


            container.RegisterType<IPrincipal>(new InjectionFactory(c => HttpContext.Current.User));

            var config = new EntityObjectStoreConfiguration();

            config.UsingEdmxContext("Model").AssociateTypes(AdventureWorksTypes);
            config.SpecifyTypesNotAssociatedWithAnyContext(() => new[] { typeof(AWDomainObject) });

            container.RegisterInstance<IEntityObjectStoreConfiguration>( config, new ContainerControlledLifetimeManager());

            var serviceConfig = new ServicesConfiguration();

            serviceConfig.AddMenuServices(MenuServices);
            serviceConfig.AddContributedActions(ContributedActions);
            serviceConfig.AddSystemServices(SystemServices);

            container.RegisterInstance<IServicesConfiguration> (serviceConfig, new ContainerControlledLifetimeManager());

            container.RegisterType<IPocoAdapterMap, PocoAdapterHashMap>(new PerRequestLifetimeManager(), new InjectionConstructor(10));
            container.RegisterType<IIdentityAdapterMap, IdentityAdapterHashMap>(new PerRequestLifetimeManager(), new InjectionConstructor(10));


            container.RegisterType<IContainerInjector, DotNetDomainObjectContainerInjector>(new PerRequestLifetimeManager());

            container.RegisterType<IOidGenerator, EntityOidGenerator>(new PerRequestLifetimeManager());
            container.RegisterType<IPersistAlgorithm, EntityPersistAlgorithm>(new PerRequestLifetimeManager());
            container.RegisterType<INakedObjectStore, EntityObjectStore.EntityObjectStore>(new PerRequestLifetimeManager());
            container.RegisterType<IIdentityMap, EntityIdentityMapImpl>(new PerRequestLifetimeManager());

            container.RegisterType<IAuthorizationManager, NullAuthorizationManager>(new PerRequestLifetimeManager());
            container.RegisterType<ILifecycleManager, LifeCycleManager>(new PerRequestLifetimeManager());
            container.RegisterType<ISession, WindowsSession>(new PerRequestLifetimeManager());
            container.RegisterType<IUpdateNotifier, SimpleUpdateNotifier>(new PerRequestLifetimeManager());
            container.RegisterType<IMessageBroker, SimpleMessageBroker>(new PerRequestLifetimeManager());

            container.RegisterType<INakedObjectsFramework, NakedObjectsFramework>(new PerRequestLifetimeManager());

            container.RegisterType<IOidStrategy, ExternalOid>(new PerRequestLifetimeManager());

            container.RegisterType<INakedObjectsSurface, NakedObjectsSurface>(new PerRequestLifetimeManager());
        }
    }
}
