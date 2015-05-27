﻿// Copyright Naked Objects Group Ltd, 45 Station Road, Henley on Thames, UK, RG9 1AT
// Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. 
// You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
// Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and limitations under the License.

using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using org.nakedobjects.@object;
using sdm.systems.reflector;

namespace NakedObjects.Surface.Nof2.Wrapper {
    public class NakedObjectWrapper : INakedObjectSurface {
        private readonly Naked nakedObject;

        public NakedObjectWrapper(Naked nakedObject, INakedObjectsSurface surface) {
            this.nakedObject = nakedObject;
            Surface = surface;
        }

        public Naked NakedObject {
            get { return nakedObject; }
        }

        #region INakedObjectSurface Members

        public INakedObjectSpecificationSurface Specification {
            get { return new NakedObjectSpecificationWrapper(NakedObject.getSpecification(), NakedObject, Surface); }
        }

        public INakedObjectSpecificationSurface ElementSpecification {
            get {
                if (nakedObject is InternalCollectionAdapter) {
                    return new NakedObjectSpecificationWrapper(((InternalCollectionAdapter) nakedObject).getElementSpecification(), null, Surface);
                }
                return null;
            }
        }

        public object Object {
            get { return nakedObject.getObject(); }
        }

        public bool IsNotPersistent { get; private set; }

        public string TitleString {
            get { return nakedObject.titleString(); }
        }

        public string InvariantString { get; private set; }
        public bool IsViewModelEditView { get; private set; }
        public bool IsViewModel { get; private set; }
        public IDictionary<string, object> ExtensionData { get; private set; }

        public IEnumerable<INakedObjectSurface> ToEnumerable() {
            return ((IEnumerable) Object).Cast<object>().Select(o => new NakedObjectWrapper(org.nakedobjects.@object.NakedObjects.getObjectLoader().getAdapterFor(o), Surface));
        }

        public INakedObjectSurface Page(int page, int size) {
            return new NakedObjectWrapper(nakedObject, Surface);
        }

        public INakedObjectSurface Select(object[] selection, bool forceEnumerable) {
            throw new NotImplementedException();
        }

        public int Count() {
            var nakedCollection = nakedObject as NakedCollection;
            if (nakedCollection != null) {
                return nakedCollection.size();
            }

            return 0;
        }

        public AttachmentContext GetAttachment() {
            throw new NotImplementedException();
        }

        public object[] GetSelected() {
            throw new NotImplementedException();
        }

        public void Resolve() {
            throw new NotImplementedException();
        }

        public void SetIsNotQueryableState(bool state) {
            throw new NotImplementedException();
        }

        public T GetDomainObject<T>() {
            return (T) Object;
        }

        public PropertyInfo[] GetKeys() {
            // return NakedObjectsContext.ObjectPersistor.GetKeys(nakedObject.Object.GetType());
            return null;
        }

        public bool IsCollectionMemento { get; private set; }

        public bool IsTransient {
            get {
                var nakedRef = nakedObject as NakedReference;
                if (nakedRef != null) {
                    return nakedRef.getResolveState().isTransient() && !(new NakedObjectSpecificationWrapper(nakedRef.getSpecification(), nakedRef, Surface).IsService);
                }

                return false;
            }
        }

        public bool IsDestroyed { get; private set; }
        public bool IsUserPersistable { get; private set; }

        public IVersionSurface Version {
            get { return new VersionWrapper(((NakedReference) nakedObject).getVersion()); }
        }

        public INakedObjectActionSurface MementoAction { get; private set; }
        public string EnumIntegralValue { get; private set; }
        public bool IsPaged { get; private set; }

        public IOidSurface Oid {
            get { return new OidWrapper(nakedObject.getOid()); }
        }

        public INakedObjectsSurface Surface { get; set; }

        #endregion

        public override bool Equals(object obj) {
            var nakedObjectWrapper = obj as NakedObjectWrapper;
            if (nakedObjectWrapper != null) {
                return Equals(nakedObjectWrapper);
            }
            return false;
        }

        public bool Equals(NakedObjectWrapper other) {
            if (ReferenceEquals(null, other)) { return false; }
            if (ReferenceEquals(this, other)) { return true; }
            return Equals(other.nakedObject, nakedObject);
        }

        public override int GetHashCode() {
            return (nakedObject != null ? nakedObject.GetHashCode() : 0);
        }
    }
}