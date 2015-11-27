﻿// Copyright Naked Objects Group Ltd, 45 Station Road, Henley on Thames, UK, RG9 1AT
// Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. 
// You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
// Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and limitations under the License.

using System;
using System.Collections.ObjectModel;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Firefox;
using OpenQA.Selenium.IE;
using OpenQA.Selenium.Support.UI;

namespace NakedObjects.Web.UnitTests.Selenium {

    public abstract class AWTest : GeminiTest {

        protected const string CustomersMenuUrl = GeminiBaseUrl + "home?menu1=CustomerRepository";
        protected const string OrdersMenuUrl = GeminiBaseUrl + "home?menu1=OrderRepository";
        protected const string SpecialOffersMenuUrl = GeminiBaseUrl + "home?menu1=SpecialOfferRepository";
        protected const string ProductServiceUrl = GeminiBaseUrl + "home?menu1=ProductRepository";
        protected const string SalesServiceUrl = GeminiBaseUrl + "home?menu1=SalesRepository";

        protected const int MainMenusCount = 10; //'Empty' menu should not show

        protected const int CustomerServiceActions = 9;
        protected const int OrderServiceActions = 6;

    }
}