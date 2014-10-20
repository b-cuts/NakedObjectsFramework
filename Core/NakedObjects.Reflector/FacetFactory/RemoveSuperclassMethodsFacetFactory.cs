// Copyright Naked Objects Group Ltd, 45 Station Road, Henley on Thames, UK, RG9 1AT
// Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. 
// You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
// Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and limitations under the License.

using System;
using System.Collections.Generic;
using System.Reflection;
using NakedObjects.Architecture.Component;
using NakedObjects.Architecture.FacetFactory;
using NakedObjects.Architecture.Reflect;
using NakedObjects.Architecture.Spec;
using NakedObjects.Metamodel.Facet;
using NakedObjects.Metamodel.Utils;
using NakedObjects.Util;

namespace NakedObjects.Reflector.FacetFactory {
    /// <summary>
    ///     Removes all methods inherited from <see cref="object" />
    /// </summary>
    /// <para>
    ///     Implementation - .Net fails to find methods properly for root class, so we used the saved set.
    /// </para>
    public class RemoveSuperclassMethodsFacetFactory : FacetFactoryAbstract {
        private static readonly IDictionary<Type, MethodInfo[]> typeToMethods;

        static RemoveSuperclassMethodsFacetFactory() {
            typeToMethods = new Dictionary<Type, MethodInfo[]>();
        }

        public RemoveSuperclassMethodsFacetFactory(IReflector reflector)
            : base(reflector, FeatureType.ObjectsOnly) {}

        private static void InitForType(Type type) {
            if (!typeToMethods.ContainsKey(type)) {
                typeToMethods.Add(type, type.GetMethods());
            }
        }

        public void ProcessSystemType(Type type, IMethodRemover methodRemover, ISpecification holder) {
            InitForType(type);
            foreach (MethodInfo method in typeToMethods[type]) {
                if (methodRemover != null && method != null) {
                    methodRemover.RemoveMethod(method);
                }
            }
        }

        public override bool Process(Type type, IMethodRemover methodRemover, ISpecification specification) {
            Type currentType = type;
            while (currentType != null) {
                if (TypeUtils.IsSystem(currentType)) {
                    ProcessSystemType(currentType, methodRemover, specification);
                }
                currentType = currentType.BaseType;
            }
            return false;
        }
    }

    // Copyright (c) Naked Objects Group Ltd.
}