'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">@volunteerx/server documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/ActivityModule.html" data-type="entity-link" >ActivityModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ActivityModule-f697a64c4239d86cef796f66b0d9a3435828a12ea86364072dc59f93fd98dd3c63525c7b65e8ac98541f0114f49d5fa931479cf167d327a02d5abbc715eae1de"' : 'data-bs-target="#xs-controllers-links-module-ActivityModule-f697a64c4239d86cef796f66b0d9a3435828a12ea86364072dc59f93fd98dd3c63525c7b65e8ac98541f0114f49d5fa931479cf167d327a02d5abbc715eae1de"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ActivityModule-f697a64c4239d86cef796f66b0d9a3435828a12ea86364072dc59f93fd98dd3c63525c7b65e8ac98541f0114f49d5fa931479cf167d327a02d5abbc715eae1de"' :
                                            'id="xs-controllers-links-module-ActivityModule-f697a64c4239d86cef796f66b0d9a3435828a12ea86364072dc59f93fd98dd3c63525c7b65e8ac98541f0114f49d5fa931479cf167d327a02d5abbc715eae1de"' }>
                                            <li class="link">
                                                <a href="controllers/ActivityController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ActivityController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ActivityModule-f697a64c4239d86cef796f66b0d9a3435828a12ea86364072dc59f93fd98dd3c63525c7b65e8ac98541f0114f49d5fa931479cf167d327a02d5abbc715eae1de"' : 'data-bs-target="#xs-injectables-links-module-ActivityModule-f697a64c4239d86cef796f66b0d9a3435828a12ea86364072dc59f93fd98dd3c63525c7b65e8ac98541f0114f49d5fa931479cf167d327a02d5abbc715eae1de"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ActivityModule-f697a64c4239d86cef796f66b0d9a3435828a12ea86364072dc59f93fd98dd3c63525c7b65e8ac98541f0114f49d5fa931479cf167d327a02d5abbc715eae1de"' :
                                        'id="xs-injectables-links-module-ActivityModule-f697a64c4239d86cef796f66b0d9a3435828a12ea86364072dc59f93fd98dd3c63525c7b65e8ac98541f0114f49d5fa931479cf167d327a02d5abbc715eae1de"' }>
                                        <li class="link">
                                            <a href="injectables/ActivityRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ActivityRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ActivityService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ActivityService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-9f1206459a36eb5078cf7f73f60f0e816c0cc8fc27f105b5a37b57b3a5d7d4aacda81b06b9269bf157200af8ccfa056446668c5a27bd3a6d270c5a8f003ce111"' : 'data-bs-target="#xs-injectables-links-module-AppModule-9f1206459a36eb5078cf7f73f60f0e816c0cc8fc27f105b5a37b57b3a5d7d4aacda81b06b9269bf157200af8ccfa056446668c5a27bd3a6d270c5a8f003ce111"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-9f1206459a36eb5078cf7f73f60f0e816c0cc8fc27f105b5a37b57b3a5d7d4aacda81b06b9269bf157200af8ccfa056446668c5a27bd3a6d270c5a8f003ce111"' :
                                        'id="xs-injectables-links-module-AppModule-9f1206459a36eb5078cf7f73f60f0e816c0cc8fc27f105b5a37b57b3a5d7d4aacda81b06b9269bf157200af8ccfa056446668c5a27bd3a6d270c5a8f003ce111"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-c4645b78b13ae7e89a95f8a74db67be0cbb7109c1e7ce4f03dae8b00c5759064685b9fe6ca0fbbc678cce1080d9498050720d84361c827c13b118faf40bcfcd0"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-c4645b78b13ae7e89a95f8a74db67be0cbb7109c1e7ce4f03dae8b00c5759064685b9fe6ca0fbbc678cce1080d9498050720d84361c827c13b118faf40bcfcd0"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-c4645b78b13ae7e89a95f8a74db67be0cbb7109c1e7ce4f03dae8b00c5759064685b9fe6ca0fbbc678cce1080d9498050720d84361c827c13b118faf40bcfcd0"' :
                                        'id="xs-injectables-links-module-AuthModule-c4645b78b13ae7e89a95f8a74db67be0cbb7109c1e7ce4f03dae8b00c5759064685b9fe6ca0fbbc678cce1080d9498050720d84361c827c13b118faf40bcfcd0"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GqlAuthGuard.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GqlAuthGuard</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/BroadcastModule.html" data-type="entity-link" >BroadcastModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-BroadcastModule-2af1d8b73f5a7400d7694c13a9d2e1b30f88d8ee9c5257eb846f76b027fcc2c6df3b1ae44c5646849a4b3fe1d568b8fe19a41178a61dfecd98a5bbca7380ca0e"' : 'data-bs-target="#xs-controllers-links-module-BroadcastModule-2af1d8b73f5a7400d7694c13a9d2e1b30f88d8ee9c5257eb846f76b027fcc2c6df3b1ae44c5646849a4b3fe1d568b8fe19a41178a61dfecd98a5bbca7380ca0e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-BroadcastModule-2af1d8b73f5a7400d7694c13a9d2e1b30f88d8ee9c5257eb846f76b027fcc2c6df3b1ae44c5646849a4b3fe1d568b8fe19a41178a61dfecd98a5bbca7380ca0e"' :
                                            'id="xs-controllers-links-module-BroadcastModule-2af1d8b73f5a7400d7694c13a9d2e1b30f88d8ee9c5257eb846f76b027fcc2c6df3b1ae44c5646849a4b3fe1d568b8fe19a41178a61dfecd98a5bbca7380ca0e"' }>
                                            <li class="link">
                                                <a href="controllers/BroadcastController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BroadcastController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-BroadcastModule-2af1d8b73f5a7400d7694c13a9d2e1b30f88d8ee9c5257eb846f76b027fcc2c6df3b1ae44c5646849a4b3fe1d568b8fe19a41178a61dfecd98a5bbca7380ca0e"' : 'data-bs-target="#xs-injectables-links-module-BroadcastModule-2af1d8b73f5a7400d7694c13a9d2e1b30f88d8ee9c5257eb846f76b027fcc2c6df3b1ae44c5646849a4b3fe1d568b8fe19a41178a61dfecd98a5bbca7380ca0e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-BroadcastModule-2af1d8b73f5a7400d7694c13a9d2e1b30f88d8ee9c5257eb846f76b027fcc2c6df3b1ae44c5646849a4b3fe1d568b8fe19a41178a61dfecd98a5bbca7380ca0e"' :
                                        'id="xs-injectables-links-module-BroadcastModule-2af1d8b73f5a7400d7694c13a9d2e1b30f88d8ee9c5257eb846f76b027fcc2c6df3b1ae44c5646849a4b3fe1d568b8fe19a41178a61dfecd98a5bbca7380ca0e"' }>
                                        <li class="link">
                                            <a href="injectables/BroadcastService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BroadcastService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ChannelModule.html" data-type="entity-link" >ChannelModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ChannelModule-68559a4a7a1c2455413f0ab49d2b3b454b7e0d128e2de8b6c9a23954826f5137cb3eb5dad139bf727077a6314d0dc8a9822e0a88cc5494bd8ecff077dd83db4e"' : 'data-bs-target="#xs-controllers-links-module-ChannelModule-68559a4a7a1c2455413f0ab49d2b3b454b7e0d128e2de8b6c9a23954826f5137cb3eb5dad139bf727077a6314d0dc8a9822e0a88cc5494bd8ecff077dd83db4e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ChannelModule-68559a4a7a1c2455413f0ab49d2b3b454b7e0d128e2de8b6c9a23954826f5137cb3eb5dad139bf727077a6314d0dc8a9822e0a88cc5494bd8ecff077dd83db4e"' :
                                            'id="xs-controllers-links-module-ChannelModule-68559a4a7a1c2455413f0ab49d2b3b454b7e0d128e2de8b6c9a23954826f5137cb3eb5dad139bf727077a6314d0dc8a9822e0a88cc5494bd8ecff077dd83db4e"' }>
                                            <li class="link">
                                                <a href="controllers/ChannelController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChannelController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ChannelModule-68559a4a7a1c2455413f0ab49d2b3b454b7e0d128e2de8b6c9a23954826f5137cb3eb5dad139bf727077a6314d0dc8a9822e0a88cc5494bd8ecff077dd83db4e"' : 'data-bs-target="#xs-injectables-links-module-ChannelModule-68559a4a7a1c2455413f0ab49d2b3b454b7e0d128e2de8b6c9a23954826f5137cb3eb5dad139bf727077a6314d0dc8a9822e0a88cc5494bd8ecff077dd83db4e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ChannelModule-68559a4a7a1c2455413f0ab49d2b3b454b7e0d128e2de8b6c9a23954826f5137cb3eb5dad139bf727077a6314d0dc8a9822e0a88cc5494bd8ecff077dd83db4e"' :
                                        'id="xs-injectables-links-module-ChannelModule-68559a4a7a1c2455413f0ab49d2b3b454b7e0d128e2de8b6c9a23954826f5137cb3eb5dad139bf727077a6314d0dc8a9822e0a88cc5494bd8ecff077dd83db4e"' }>
                                        <li class="link">
                                            <a href="injectables/ChannelService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChannelService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ForumRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ForumRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/MessageService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MessageService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DeletionServiceModule.html" data-type="entity-link" >DeletionServiceModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-DeletionServiceModule-4d279b14e0a8eb875664d08696e98766e7eea4a5c03084d73031770a15d7f5068b66ef561f3592a44981e5fe58be09a90a1b94b87de82c50ce384e56c4ed98d2"' : 'data-bs-target="#xs-controllers-links-module-DeletionServiceModule-4d279b14e0a8eb875664d08696e98766e7eea4a5c03084d73031770a15d7f5068b66ef561f3592a44981e5fe58be09a90a1b94b87de82c50ce384e56c4ed98d2"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-DeletionServiceModule-4d279b14e0a8eb875664d08696e98766e7eea4a5c03084d73031770a15d7f5068b66ef561f3592a44981e5fe58be09a90a1b94b87de82c50ce384e56c4ed98d2"' :
                                            'id="xs-controllers-links-module-DeletionServiceModule-4d279b14e0a8eb875664d08696e98766e7eea4a5c03084d73031770a15d7f5068b66ef561f3592a44981e5fe58be09a90a1b94b87de82c50ce384e56c4ed98d2"' }>
                                            <li class="link">
                                                <a href="controllers/DeletionServiceController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DeletionServiceController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-DeletionServiceModule-4d279b14e0a8eb875664d08696e98766e7eea4a5c03084d73031770a15d7f5068b66ef561f3592a44981e5fe58be09a90a1b94b87de82c50ce384e56c4ed98d2"' : 'data-bs-target="#xs-injectables-links-module-DeletionServiceModule-4d279b14e0a8eb875664d08696e98766e7eea4a5c03084d73031770a15d7f5068b66ef561f3592a44981e5fe58be09a90a1b94b87de82c50ce384e56c4ed98d2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DeletionServiceModule-4d279b14e0a8eb875664d08696e98766e7eea4a5c03084d73031770a15d7f5068b66ef561f3592a44981e5fe58be09a90a1b94b87de82c50ce384e56c4ed98d2"' :
                                        'id="xs-injectables-links-module-DeletionServiceModule-4d279b14e0a8eb875664d08696e98766e7eea4a5c03084d73031770a15d7f5068b66ef561f3592a44981e5fe58be09a90a1b94b87de82c50ce384e56c4ed98d2"' }>
                                        <li class="link">
                                            <a href="injectables/DeletionServiceService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DeletionServiceService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FileFlowEngineModule.html" data-type="entity-link" >FileFlowEngineModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-FileFlowEngineModule-cb80e7947ed53c8603b6f5033461ca33cbf949969f12f88f2ff8b1aabccc75ff6d9b33bd359c3634c57ef007b5fcacac3706a086c4c4bbfad9da047faa7018ba"' : 'data-bs-target="#xs-controllers-links-module-FileFlowEngineModule-cb80e7947ed53c8603b6f5033461ca33cbf949969f12f88f2ff8b1aabccc75ff6d9b33bd359c3634c57ef007b5fcacac3706a086c4c4bbfad9da047faa7018ba"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-FileFlowEngineModule-cb80e7947ed53c8603b6f5033461ca33cbf949969f12f88f2ff8b1aabccc75ff6d9b33bd359c3634c57ef007b5fcacac3706a086c4c4bbfad9da047faa7018ba"' :
                                            'id="xs-controllers-links-module-FileFlowEngineModule-cb80e7947ed53c8603b6f5033461ca33cbf949969f12f88f2ff8b1aabccc75ff6d9b33bd359c3634c57ef007b5fcacac3706a086c4c4bbfad9da047faa7018ba"' }>
                                            <li class="link">
                                                <a href="controllers/FileFlowEngineController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FileFlowEngineController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-FileFlowEngineModule-cb80e7947ed53c8603b6f5033461ca33cbf949969f12f88f2ff8b1aabccc75ff6d9b33bd359c3634c57ef007b5fcacac3706a086c4c4bbfad9da047faa7018ba"' : 'data-bs-target="#xs-injectables-links-module-FileFlowEngineModule-cb80e7947ed53c8603b6f5033461ca33cbf949969f12f88f2ff8b1aabccc75ff6d9b33bd359c3634c57ef007b5fcacac3706a086c4c4bbfad9da047faa7018ba"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FileFlowEngineModule-cb80e7947ed53c8603b6f5033461ca33cbf949969f12f88f2ff8b1aabccc75ff6d9b33bd359c3634c57ef007b5fcacac3706a086c4c4bbfad9da047faa7018ba"' :
                                        'id="xs-injectables-links-module-FileFlowEngineModule-cb80e7947ed53c8603b6f5033461ca33cbf949969f12f88f2ff8b1aabccc75ff6d9b33bd359c3634c57ef007b5fcacac3706a086c4c4bbfad9da047faa7018ba"' }>
                                        <li class="link">
                                            <a href="injectables/AWSService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AWSService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FileFlowEngineService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FileFlowEngineService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FirebaseModule.html" data-type="entity-link" >FirebaseModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HealthModule.html" data-type="entity-link" >HealthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-HealthModule-d9d98147717d4e408163642f8da7f11469aa014aea7d4f483cb3b61c77bda4e800a8b3d12358a708b2875f4376918926f159a8c31b78a1846dfda360071a47f2"' : 'data-bs-target="#xs-controllers-links-module-HealthModule-d9d98147717d4e408163642f8da7f11469aa014aea7d4f483cb3b61c77bda4e800a8b3d12358a708b2875f4376918926f159a8c31b78a1846dfda360071a47f2"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-HealthModule-d9d98147717d4e408163642f8da7f11469aa014aea7d4f483cb3b61c77bda4e800a8b3d12358a708b2875f4376918926f159a8c31b78a1846dfda360071a47f2"' :
                                            'id="xs-controllers-links-module-HealthModule-d9d98147717d4e408163642f8da7f11469aa014aea7d4f483cb3b61c77bda4e800a8b3d12358a708b2875f4376918926f159a8c31b78a1846dfda360071a47f2"' }>
                                            <li class="link">
                                                <a href="controllers/HealthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HealthController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HealthModule.html" data-type="entity-link" >HealthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-HealthModule-d9d98147717d4e408163642f8da7f11469aa014aea7d4f483cb3b61c77bda4e800a8b3d12358a708b2875f4376918926f159a8c31b78a1846dfda360071a47f2-1"' : 'data-bs-target="#xs-controllers-links-module-HealthModule-d9d98147717d4e408163642f8da7f11469aa014aea7d4f483cb3b61c77bda4e800a8b3d12358a708b2875f4376918926f159a8c31b78a1846dfda360071a47f2-1"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-HealthModule-d9d98147717d4e408163642f8da7f11469aa014aea7d4f483cb3b61c77bda4e800a8b3d12358a708b2875f4376918926f159a8c31b78a1846dfda360071a47f2-1"' :
                                            'id="xs-controllers-links-module-HealthModule-d9d98147717d4e408163642f8da7f11469aa014aea7d4f483cb3b61c77bda4e800a8b3d12358a708b2875f4376918926f159a8c31b78a1846dfda360071a47f2-1"' }>
                                            <li class="link">
                                                <a href="controllers/HealthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HealthController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HealthModule.html" data-type="entity-link" >HealthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-HealthModule-2e06dc8ffbb38f4cd9376c93eb41928dcd8b52c5e03f962bcffb62b4fff0949a67f53f9ca0deec7459db706a3dbf7d373028f133196d329187d5253064823ee1-2"' : 'data-bs-target="#xs-controllers-links-module-HealthModule-2e06dc8ffbb38f4cd9376c93eb41928dcd8b52c5e03f962bcffb62b4fff0949a67f53f9ca0deec7459db706a3dbf7d373028f133196d329187d5253064823ee1-2"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-HealthModule-2e06dc8ffbb38f4cd9376c93eb41928dcd8b52c5e03f962bcffb62b4fff0949a67f53f9ca0deec7459db706a3dbf7d373028f133196d329187d5253064823ee1-2"' :
                                            'id="xs-controllers-links-module-HealthModule-2e06dc8ffbb38f4cd9376c93eb41928dcd8b52c5e03f962bcffb62b4fff0949a67f53f9ca0deec7459db706a3dbf7d373028f133196d329187d5253064823ee1-2"' }>
                                            <li class="link">
                                                <a href="controllers/HealthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HealthController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HealthModule.html" data-type="entity-link" >HealthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-HealthModule-5ca03a787a09e6255fe963a329e3eebae021d9bd91ef61ca47defdad492656653a6e9fe0b12a4dac5552abfcc5672c9a4d41ec40b27576f071815cd6fc23a783-3"' : 'data-bs-target="#xs-controllers-links-module-HealthModule-5ca03a787a09e6255fe963a329e3eebae021d9bd91ef61ca47defdad492656653a6e9fe0b12a4dac5552abfcc5672c9a4d41ec40b27576f071815cd6fc23a783-3"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-HealthModule-5ca03a787a09e6255fe963a329e3eebae021d9bd91ef61ca47defdad492656653a6e9fe0b12a4dac5552abfcc5672c9a4d41ec40b27576f071815cd6fc23a783-3"' :
                                            'id="xs-controllers-links-module-HealthModule-5ca03a787a09e6255fe963a329e3eebae021d9bd91ef61ca47defdad492656653a6e9fe0b12a4dac5552abfcc5672c9a4d41ec40b27576f071815cd6fc23a783-3"' }>
                                            <li class="link">
                                                <a href="controllers/HealthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HealthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-HealthModule-5ca03a787a09e6255fe963a329e3eebae021d9bd91ef61ca47defdad492656653a6e9fe0b12a4dac5552abfcc5672c9a4d41ec40b27576f071815cd6fc23a783-3"' : 'data-bs-target="#xs-injectables-links-module-HealthModule-5ca03a787a09e6255fe963a329e3eebae021d9bd91ef61ca47defdad492656653a6e9fe0b12a4dac5552abfcc5672c9a4d41ec40b27576f071815cd6fc23a783-3"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-HealthModule-5ca03a787a09e6255fe963a329e3eebae021d9bd91ef61ca47defdad492656653a6e9fe0b12a4dac5552abfcc5672c9a4d41ec40b27576f071815cd6fc23a783-3"' :
                                        'id="xs-injectables-links-module-HealthModule-5ca03a787a09e6255fe963a329e3eebae021d9bd91ef61ca47defdad492656653a6e9fe0b12a4dac5552abfcc5672c9a4d41ec40b27576f071815cd6fc23a783-3"' }>
                                        <li class="link">
                                            <a href="injectables/PingRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PingRepository</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MessageModule.html" data-type="entity-link" >MessageModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MessageModule-3a535be6b77ab9106ef91ff2535fed295bfe07accfb23bfe44279ea79a4310262206211673bb0c8d435112b9acc509e7273b165464c89d1ef52f98d7ebd89974"' : 'data-bs-target="#xs-injectables-links-module-MessageModule-3a535be6b77ab9106ef91ff2535fed295bfe07accfb23bfe44279ea79a4310262206211673bb0c8d435112b9acc509e7273b165464c89d1ef52f98d7ebd89974"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MessageModule-3a535be6b77ab9106ef91ff2535fed295bfe07accfb23bfe44279ea79a4310262206211673bb0c8d435112b9acc509e7273b165464c89d1ef52f98d7ebd89974"' :
                                        'id="xs-injectables-links-module-MessageModule-3a535be6b77ab9106ef91ff2535fed295bfe07accfb23bfe44279ea79a4310262206211673bb0c8d435112b9acc509e7273b165464c89d1ef52f98d7ebd89974"' }>
                                        <li class="link">
                                            <a href="injectables/ForumRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ForumRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/MessageService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MessageService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/Neo4jCommonModule.html" data-type="entity-link" >Neo4jCommonModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/Neo4jModule.html" data-type="entity-link" >Neo4jModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-Neo4jModule-4fe4fe861e5c3ee52102021d3a94379749804fa4e980d0346b0b643592b5bdcf67f6e5ee7b800145601b55b63204ddbd756c61d323b2493ee8c9ab746acfb64c"' : 'data-bs-target="#xs-controllers-links-module-Neo4jModule-4fe4fe861e5c3ee52102021d3a94379749804fa4e980d0346b0b643592b5bdcf67f6e5ee7b800145601b55b63204ddbd756c61d323b2493ee8c9ab746acfb64c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-Neo4jModule-4fe4fe861e5c3ee52102021d3a94379749804fa4e980d0346b0b643592b5bdcf67f6e5ee7b800145601b55b63204ddbd756c61d323b2493ee8c9ab746acfb64c"' :
                                            'id="xs-controllers-links-module-Neo4jModule-4fe4fe861e5c3ee52102021d3a94379749804fa4e980d0346b0b643592b5bdcf67f6e5ee7b800145601b55b63204ddbd756c61d323b2493ee8c9ab746acfb64c"' }>
                                            <li class="link">
                                                <a href="controllers/Neo4jController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Neo4jController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-Neo4jModule-4fe4fe861e5c3ee52102021d3a94379749804fa4e980d0346b0b643592b5bdcf67f6e5ee7b800145601b55b63204ddbd756c61d323b2493ee8c9ab746acfb64c"' : 'data-bs-target="#xs-injectables-links-module-Neo4jModule-4fe4fe861e5c3ee52102021d3a94379749804fa4e980d0346b0b643592b5bdcf67f6e5ee7b800145601b55b63204ddbd756c61d323b2493ee8c9ab746acfb64c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-Neo4jModule-4fe4fe861e5c3ee52102021d3a94379749804fa4e980d0346b0b643592b5bdcf67f6e5ee7b800145601b55b63204ddbd756c61d323b2493ee8c9ab746acfb64c"' :
                                        'id="xs-injectables-links-module-Neo4jModule-4fe4fe861e5c3ee52102021d3a94379749804fa4e980d0346b0b643592b5bdcf67f6e5ee7b800145601b55b63204ddbd756c61d323b2493ee8c9ab746acfb64c"' }>
                                        <li class="link">
                                            <a href="injectables/Neo4jService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Neo4jService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PingModule.html" data-type="entity-link" >PingModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PingModule-f9b78731364e0ab31c8220d478cfea9a15d6341ea9393fee85b26dd70bb4ed9aa1295b82c524f711c4b37e984741bede10641acd3f9065b2ff518dff23c45fc6"' : 'data-bs-target="#xs-injectables-links-module-PingModule-f9b78731364e0ab31c8220d478cfea9a15d6341ea9393fee85b26dd70bb4ed9aa1295b82c524f711c4b37e984741bede10641acd3f9065b2ff518dff23c45fc6"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PingModule-f9b78731364e0ab31c8220d478cfea9a15d6341ea9393fee85b26dd70bb4ed9aa1295b82c524f711c4b37e984741bede10641acd3f9065b2ff518dff23c45fc6"' :
                                        'id="xs-injectables-links-module-PingModule-f9b78731364e0ab31c8220d478cfea9a15d6341ea9393fee85b26dd70bb4ed9aa1295b82c524f711c4b37e984741bede10641acd3f9065b2ff518dff23c45fc6"' }>
                                        <li class="link">
                                            <a href="injectables/PingRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PingRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PingService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PingService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PrismaModule.html" data-type="entity-link" >PrismaModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/RmqModule.html" data-type="entity-link" >RmqModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-RmqModule-870c44a91fafbe0a8a88428b97371d5c0d851bd2cc66dcccf189b868f0d379b760e43d9a38c9a908b1af16e2fea7cd99a03b198716506fb044f75f0af609f0cf"' : 'data-bs-target="#xs-injectables-links-module-RmqModule-870c44a91fafbe0a8a88428b97371d5c0d851bd2cc66dcccf189b868f0d379b760e43d9a38c9a908b1af16e2fea7cd99a03b198716506fb044f75f0af609f0cf"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RmqModule-870c44a91fafbe0a8a88428b97371d5c0d851bd2cc66dcccf189b868f0d379b760e43d9a38c9a908b1af16e2fea7cd99a03b198716506fb044f75f0af609f0cf"' :
                                        'id="xs-injectables-links-module-RmqModule-870c44a91fafbe0a8a88428b97371d5c0d851bd2cc66dcccf189b868f0d379b760e43d9a38c9a908b1af16e2fea7cd99a03b198716506fb044f75f0af609f0cf"' }>
                                        <li class="link">
                                            <a href="injectables/RMQService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RMQService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UserModule-4449d7e0befc3f94d7dff0657baf7a0c6f2d861361b30b067e6b8712bf1350f771b33d6562b647026b2457647b102ec65034748b3d37d672ea87a38faa7916ed"' : 'data-bs-target="#xs-injectables-links-module-UserModule-4449d7e0befc3f94d7dff0657baf7a0c6f2d861361b30b067e6b8712bf1350f771b33d6562b647026b2457647b102ec65034748b3d37d672ea87a38faa7916ed"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-4449d7e0befc3f94d7dff0657baf7a0c6f2d861361b30b067e6b8712bf1350f771b33d6562b647026b2457647b102ec65034748b3d37d672ea87a38faa7916ed"' :
                                        'id="xs-injectables-links-module-UserModule-4449d7e0befc3f94d7dff0657baf7a0c6f2d861361b30b067e6b8712bf1350f771b33d6562b647026b2457647b102ec65034748b3d37d672ea87a38faa7916ed"' }>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/ActivityController.html" data-type="entity-link" >ActivityController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/BroadcastController.html" data-type="entity-link" >BroadcastController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ChannelController.html" data-type="entity-link" >ChannelController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/DeletionServiceController.html" data-type="entity-link" >DeletionServiceController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/FileFlowEngineController.html" data-type="entity-link" >FileFlowEngineController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/HealthController.html" data-type="entity-link" >HealthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/HealthController-1.html" data-type="entity-link" >HealthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/HealthController-2.html" data-type="entity-link" >HealthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/HealthController-3.html" data-type="entity-link" >HealthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/Neo4jController.html" data-type="entity-link" >Neo4jController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UserController.html" data-type="entity-link" >UserController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AuthEntity.html" data-type="entity-link" >AuthEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/ChannelGateway.html" data-type="entity-link" >ChannelGateway</a>
                            </li>
                            <li class="link">
                                <a href="classes/ChannelResolver.html" data-type="entity-link" >ChannelResolver</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserInput.html" data-type="entity-link" >CreateUserInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/FirebaseConstants.html" data-type="entity-link" >FirebaseConstants</a>
                            </li>
                            <li class="link">
                                <a href="classes/ForbiddenError.html" data-type="entity-link" >ForbiddenError</a>
                            </li>
                            <li class="link">
                                <a href="classes/IMutation.html" data-type="entity-link" >IMutation</a>
                            </li>
                            <li class="link">
                                <a href="classes/InternalServerError.html" data-type="entity-link" >InternalServerError</a>
                            </li>
                            <li class="link">
                                <a href="classes/InvalidInputError.html" data-type="entity-link" >InvalidInputError</a>
                            </li>
                            <li class="link">
                                <a href="classes/IQuery.html" data-type="entity-link" >IQuery</a>
                            </li>
                            <li class="link">
                                <a href="classes/MessageResolver.html" data-type="entity-link" >MessageResolver</a>
                            </li>
                            <li class="link">
                                <a href="classes/Name.html" data-type="entity-link" >Name</a>
                            </li>
                            <li class="link">
                                <a href="classes/Neo4jErrorFilter.html" data-type="entity-link" >Neo4jErrorFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/NotFoundError.html" data-type="entity-link" >NotFoundError</a>
                            </li>
                            <li class="link">
                                <a href="classes/PayloadResolver.html" data-type="entity-link" >PayloadResolver</a>
                            </li>
                            <li class="link">
                                <a href="classes/Ping.html" data-type="entity-link" >Ping</a>
                            </li>
                            <li class="link">
                                <a href="classes/PingResolver.html" data-type="entity-link" >PingResolver</a>
                            </li>
                            <li class="link">
                                <a href="classes/UnauthorizedError.html" data-type="entity-link" >UnauthorizedError</a>
                            </li>
                            <li class="link">
                                <a href="classes/UnknownError.html" data-type="entity-link" >UnknownError</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserInput.html" data-type="entity-link" >UpdateUserInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="classes/User-1.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserResolver.html" data-type="entity-link" >UserResolver</a>
                            </li>
                            <li class="link">
                                <a href="classes/WrappedPayload.html" data-type="entity-link" >WrappedPayload</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ActivityRepository.html" data-type="entity-link" >ActivityRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ActivityService.html" data-type="entity-link" >ActivityService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AWSService.html" data-type="entity-link" >AWSService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BroadcastService.html" data-type="entity-link" >BroadcastService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ChannelService.html" data-type="entity-link" >ChannelService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DeletionServiceService.html" data-type="entity-link" >DeletionServiceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FileFlowEngineService.html" data-type="entity-link" >FileFlowEngineService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ForumRepository.html" data-type="entity-link" >ForumRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GqlAuthGuard.html" data-type="entity-link" >GqlAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MessageService.html" data-type="entity-link" >MessageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/Neo4jCommonService.html" data-type="entity-link" >Neo4jCommonService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/Neo4jService.html" data-type="entity-link" >Neo4jService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/Neo4jTransactionInterceptor.html" data-type="entity-link" >Neo4jTransactionInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/Neo4jTypeInterceptor.html" data-type="entity-link" >Neo4jTypeInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PingRepository.html" data-type="entity-link" >PingRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PingService.html" data-type="entity-link" >PingService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PrismaService.html" data-type="entity-link" >PrismaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RmqConfigService.html" data-type="entity-link" >RmqConfigService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RMQService.html" data-type="entity-link" >RMQService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/BaseError.html" data-type="entity-link" >BaseError</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CreatePingInput.html" data-type="entity-link" >CreatePingInput</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FirebaseAdmin.html" data-type="entity-link" >FirebaseAdmin</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FirebaseModuleOptionsFactory.html" data-type="entity-link" >FirebaseModuleOptionsFactory</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Forum.html" data-type="entity-link" >Forum</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetParticipantsResponse.html" data-type="entity-link" >GetParticipantsResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IMutation.html" data-type="entity-link" >IMutation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IQuery.html" data-type="entity-link" >IQuery</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IQuery-1.html" data-type="entity-link" >IQuery</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/JsonObject.html" data-type="entity-link" >JsonObject</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/JwtPayload.html" data-type="entity-link" >JwtPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Media.html" data-type="entity-link" >Media</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MediaInput.html" data-type="entity-link" >MediaInput</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PageInfo.html" data-type="entity-link" >PageInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Ping.html" data-type="entity-link" >Ping</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PingConnection.html" data-type="entity-link" >PingConnection</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PingEdge.html" data-type="entity-link" >PingEdge</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PrismaModuleAsyncOptions.html" data-type="entity-link" >PrismaModuleAsyncOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PrismaOptionsFactory.html" data-type="entity-link" >PrismaOptionsFactory</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RmqModuleOptions.html" data-type="entity-link" >RmqModuleOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UPingInput.html" data-type="entity-link" >UPingInput</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UPingsWithinRadiusInput.html" data-type="entity-link" >UPingsWithinRadiusInput</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User-1.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});