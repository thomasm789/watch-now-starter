/*
{
  "name": "Netflix",
  "id": "com.syncler.watch.netflix",
  "version": 1,
  "classPath": "watchNow.WatchNowPackage",
  "permaUrl": "https://raw.githubusercontent.com/thomasm789/watch-now-starter/main/package.js"
}
*/

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
        typeof define === 'function' && define.amd ? define(['exports'], factory) :
            (factory((global.watchNow = {})));
}(this, (function (exports) {
    'use strict';

    /**
     * You may add additional services available in your location
     * and their package names
     */
    var services = [
        {
            service: 'Netflix',
            androidPackageNames: ['com.netflix.mediaclient']
        }
    ];
    var AllSourceProvider = /** @class */ (function () {
        function AllSourceProvider() {
            this.sourceProviderMetadata = {
                name: 'Watch now',
                premium: false
            };
        }
        AllSourceProvider.prototype.search = function (env, request) {
            var sources = [];
            var streamingServices = services
                .filter(function (service) {
                    /**
                     * Here you may want to filter out
                     * services that are not available in your location
                     *
                     * Here you may also want to connect to 3rd party apis
                     * to find out if the content requested is available in your location.
                     */
                    var _a;
                    /**
                     * Example: Reading media metadata
                     */
                    var movie = request.movie;
                    var show = (_a = request.episode) === null || _a === void 0 ? void 0 : _a.show;
                    var item = movie ? movie : show;
                    console.log(item.ids.imdb);
                    console.log(item.ids.tmdb);
                    console.log(item.ids.trakt);
                    console.log(item.titles.main.title);
                    if (request.episode) {
                        console.log(request.episode.seasonNumber);
                        console.log(request.episode.episodeNumber);
                    }
                    /**
                     * Example: Connecting to 3rd party api
                     *
                     * createNewInstance creates an axios instance
                     * which can send http requests for you.
                     * Axios doc: https://github.com/axios/axios.
                     */
                    // var httpClient = env.httpClientFactory.createNewInstance();
                    //httpClient.get(yourApiUrl)
                    return true;
                });
            streamingServices
                .forEach(function (service) {
                    return service.androidPackageNames
                        .forEach(function (androidPackage) {
                            sources.push({
                                /**
                                 * Mandatory
                                 * Android package to launch
                                 */
                                androidPackageName: androidPackage,
                                /**
                                 * Optional.
                                 * If this package supports deep linking
                                 * providing an url to correct content here
                                 * will cause the app to automatically navigate to the content upon launch.
                                 * Which can be very convenient.
                                 */
                                // url: 'android://' + androidPackage
                                url: 'nflx://www.netflix.com/watch/80126024'
                            });
                        });
                });
            return Promise.resolve(sources);
        };
        return AllSourceProvider;
    }());

    var WatchNowPackage = /** @class */ (function () {
        /**
         *
         */
        function WatchNowPackage() {
            this.sourceProviders = [new AllSourceProvider()];
        }
        WatchNowPackage.prototype.createBundle = function (env, request) {
            return Promise.resolve({
                sourceProviderMetadatas: this.sourceProviders.map(function (provider) { return provider.sourceProviderMetadata; }),
                sources: []
            });
        };
        WatchNowPackage.prototype.createSourceProvider = function (env, metadata) {
            return this.sourceProviders.filter(function (provider) { return provider.sourceProviderMetadata.name == metadata.name; })[0];
        };
        return WatchNowPackage;
    }());

    exports.WatchNowPackage = WatchNowPackage;

    Object.defineProperty(exports, '__esModule', { value: true });

})));