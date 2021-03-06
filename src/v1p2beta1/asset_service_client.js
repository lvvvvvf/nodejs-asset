// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

const gapicConfig = require('./asset_service_client_config.json');
const gax = require('google-gax');
const path = require('path');

const VERSION = require('../../package.json').version;

/**
 * Asset service definition.
 *
 * @class
 * @memberof v1p2beta1
 */
class AssetServiceClient {
  /**
   * Construct an instance of AssetServiceClient.
   *
   * @param {object} [options] - The configuration object. See the subsequent
   *   parameters for more details.
   * @param {object} [options.credentials] - Credentials object.
   * @param {string} [options.credentials.client_email]
   * @param {string} [options.credentials.private_key]
   * @param {string} [options.email] - Account email address. Required when
   *     using a .pem or .p12 keyFilename.
   * @param {string} [options.keyFilename] - Full path to the a .json, .pem, or
   *     .p12 key downloaded from the Google Developers Console. If you provide
   *     a path to a JSON file, the projectId option below is not necessary.
   *     NOTE: .pem and .p12 require you to specify options.email as well.
   * @param {number} [options.port] - The port on which to connect to
   *     the remote host.
   * @param {string} [options.projectId] - The project ID from the Google
   *     Developer's Console, e.g. 'grape-spaceship-123'. We will also check
   *     the environment variable GCLOUD_PROJECT for your project ID. If your
   *     app is running in an environment which supports
   *     {@link https://developers.google.com/identity/protocols/application-default-credentials Application Default Credentials},
   *     your project ID will be detected automatically.
   * @param {function} [options.promise] - Custom promise module to use instead
   *     of native Promises.
   * @param {string} [options.apiEndpoint] - The domain name of the
   *     API remote host.
   */
  constructor(opts) {
    opts = opts || {};
    this._descriptors = {};

    if (global.isBrowser) {
      // If we're in browser, we use gRPC fallback.
      opts.fallback = true;
    }

    // If we are in browser, we are already using fallback because of the
    // "browser" field in package.json.
    // But if we were explicitly requested to use fallback, let's do it now.
    const gaxModule = !global.isBrowser && opts.fallback ? gax.fallback : gax;

    const servicePath =
      opts.servicePath || opts.apiEndpoint || this.constructor.servicePath;

    // Ensure that options include the service address and port.
    opts = Object.assign(
      {
        clientConfig: {},
        port: this.constructor.port,
        servicePath,
      },
      opts
    );

    // Create a `gaxGrpc` object, with any grpc-specific options
    // sent to the client.
    opts.scopes = this.constructor.scopes;
    const gaxGrpc = new gaxModule.GrpcClient(opts);

    // Save the auth object to the client, for use by other methods.
    this.auth = gaxGrpc.auth;

    // Determine the client header string.
    const clientHeader = [];

    if (typeof process !== 'undefined' && 'versions' in process) {
      clientHeader.push(`gl-node/${process.versions.node}`);
    }
    clientHeader.push(`gax/${gaxModule.version}`);
    if (opts.fallback) {
      clientHeader.push(`gl-web/${gaxModule.version}`);
    } else {
      clientHeader.push(`grpc/${gaxGrpc.grpcVersion}`);
    }
    clientHeader.push(`gapic/${VERSION}`);
    if (opts.libName && opts.libVersion) {
      clientHeader.push(`${opts.libName}/${opts.libVersion}`);
    }

    // Load the applicable protos.
    // For Node.js, pass the path to JSON proto file.
    // For browsers, pass the JSON content.

    const nodejsProtoPath = path.join(
      __dirname,
      '..',
      '..',
      'protos',
      'protos.json'
    );
    const protos = gaxGrpc.loadProto(
      opts.fallback ? require('../../protos/protos.json') : nodejsProtoPath
    );

    // This API contains "path templates"; forward-slash-separated
    // identifiers to uniquely identify resources within the API.
    // Create useful helper objects for these.
    this._pathTemplates = {
      feedPathTemplate: new gaxModule.PathTemplate(
        'projects/{project}/feeds/{feed}'
      ),
    };

    const protoFilesRoot = opts.fallback
      ? gaxModule.protobuf.Root.fromJSON(require('../../protos/protos.json'))
      : gaxModule.protobuf.loadSync(nodejsProtoPath);

    // This API contains "long-running operations", which return a
    // an Operation object that allows for tracking of the operation,
    // rather than holding a request open.
    this.operationsClient = new gaxModule.lro({
      auth: gaxGrpc.auth,
      grpc: gaxGrpc.grpc,
    }).operationsClient(opts);

    const exportAssetsResponse = protoFilesRoot.lookup(
      'google.cloud.asset.v1p2beta1.ExportAssetsResponse'
    );
    const exportAssetsMetadata = protoFilesRoot.lookup(
      'google.cloud.asset.v1p2beta1.ExportAssetsRequest'
    );

    this._descriptors.longrunning = {
      exportAssets: new gaxModule.LongrunningDescriptor(
        this.operationsClient,
        exportAssetsResponse.decode.bind(exportAssetsResponse),
        exportAssetsMetadata.decode.bind(exportAssetsMetadata)
      ),
    };

    // Put together the default options sent with requests.
    const defaults = gaxGrpc.constructSettings(
      'google.cloud.asset.v1p2beta1.AssetService',
      gapicConfig,
      opts.clientConfig,
      {'x-goog-api-client': clientHeader.join(' ')}
    );

    // Set up a dictionary of "inner API calls"; the core implementation
    // of calling the API is handled in `google-gax`, with this code
    // merely providing the destination and request information.
    this._innerApiCalls = {};

    // Put together the "service stub" for
    // google.cloud.asset.v1p2beta1.AssetService.
    const assetServiceStub = gaxGrpc.createStub(
      opts.fallback
        ? protos.lookupService('google.cloud.asset.v1p2beta1.AssetService')
        : protos.google.cloud.asset.v1p2beta1.AssetService,
      opts
    );

    // Iterate over each of the methods that the service provides
    // and create an API call method for each.
    const assetServiceStubMethods = [
      'exportAssets',
      'batchGetAssetsHistory',
      'createFeed',
      'getFeed',
      'listFeeds',
      'updateFeed',
      'deleteFeed',
    ];
    for (const methodName of assetServiceStubMethods) {
      const innerCallPromise = assetServiceStub.then(
        stub => (...args) => {
          return stub[methodName].apply(stub, args);
        },
        err => () => {
          throw err;
        }
      );
      this._innerApiCalls[methodName] = gaxModule.createApiCall(
        innerCallPromise,
        defaults[methodName],
        this._descriptors.longrunning[methodName]
      );
    }
  }

  /**
   * The DNS address for this API service.
   */
  static get servicePath() {
    return 'cloudasset.googleapis.com';
  }

  /**
   * The DNS address for this API service - same as servicePath(),
   * exists for compatibility reasons.
   */
  static get apiEndpoint() {
    return 'cloudasset.googleapis.com';
  }

  /**
   * The port for this API service.
   */
  static get port() {
    return 443;
  }

  /**
   * The scopes needed to make gRPC calls for every method defined
   * in this service.
   */
  static get scopes() {
    return ['https://www.googleapis.com/auth/cloud-platform'];
  }

  /**
   * Return the project ID used by this class.
   * @param {function(Error, string)} callback - the callback to
   *   be called with the current project Id.
   */
  getProjectId(callback) {
    return this.auth.getProjectId(callback);
  }

  // -------------------
  // -- Service calls --
  // -------------------

  /**
   * Exports assets with time and resource types to a given Cloud Storage
   * location. The output format is newline-delimited JSON.
   * This API implements the google.longrunning.Operation API allowing you
   * to keep track of the export.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.parent
   *   Required. The relative name of the root asset. This can only be an
   *   organization number (such as "organizations/123"), a project ID (such as
   *   "projects/my-project-id"), or a project number (such as "projects/12345").
   * @param {Object} request.outputConfig
   *   Required. Output configuration indicating where the results will be output
   *   to. All results will be in newline delimited JSON format.
   *
   *   This object should have the same structure as [OutputConfig]{@link google.cloud.asset.v1p2beta1.OutputConfig}
   * @param {Object} [request.readTime]
   *   Timestamp to take an asset snapshot. This can only be set to a timestamp
   *   between 2018-10-02 UTC (inclusive) and the current time. If not specified,
   *   the current time will be used. Due to delays in resource data collection
   *   and indexing, there is a volatile window during which running the same
   *   query may get different results.
   *
   *   This object should have the same structure as [Timestamp]{@link google.protobuf.Timestamp}
   * @param {string[]} [request.assetTypes]
   *   A list of asset types of which to take a snapshot for. For example:
   *   "compute.googleapis.com/Disk". If specified, only matching assets will be
   *   returned. See [Introduction to Cloud Asset
   *   Inventory](https://cloud.google.com/resource-manager/docs/cloud-asset-inventory/overview)
   *   for all supported asset types.
   * @param {number} [request.contentType]
   *   Asset content type. If not specified, no content but the asset name will be
   *   returned.
   *
   *   The number should be among the values of [ContentType]{@link google.cloud.asset.v1p2beta1.ContentType}
   * @param {Object} [options]
   *   Optional parameters. You can override the default settings for this call, e.g, timeout,
   *   retries, paginations, etc. See [gax.CallOptions]{@link https://googleapis.github.io/gax-nodejs/interfaces/CallOptions.html} for the details.
   * @param {function(?Error, ?Object)} [callback]
   *   The function which will be called with the result of the API call.
   *
   *   The second parameter to the callback is a [gax.Operation]{@link https://googleapis.github.io/gax-nodejs/classes/Operation.html} object.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is a [gax.Operation]{@link https://googleapis.github.io/gax-nodejs/classes/Operation.html} object.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   *
   * @example
   *
   * const asset = require('asset.v1p2beta1');
   *
   * const client = new asset.v1p2beta1.AssetServiceClient({
   *   // optional auth parameters.
   * });
   *
   * const parent = '';
   * const outputConfig = {};
   * const request = {
   *   parent: parent,
   *   outputConfig: outputConfig,
   * };
   *
   * // Handle the operation using the promise pattern.
   * client.exportAssets(request)
   *   .then(responses => {
   *     const [operation, initialApiResponse] = responses;
   *
   *     // Operation#promise starts polling for the completion of the LRO.
   *     return operation.promise();
   *   })
   *   .then(responses => {
   *     const result = responses[0];
   *     const metadata = responses[1];
   *     const finalApiResponse = responses[2];
   *   })
   *   .catch(err => {
   *     console.error(err);
   *   });
   *
   * const parent = '';
   * const outputConfig = {};
   * const request = {
   *   parent: parent,
   *   outputConfig: outputConfig,
   * };
   *
   * // Handle the operation using the event emitter pattern.
   * client.exportAssets(request)
   *   .then(responses => {
   *     const [operation, initialApiResponse] = responses;
   *
   *     // Adding a listener for the "complete" event starts polling for the
   *     // completion of the operation.
   *     operation.on('complete', (result, metadata, finalApiResponse) => {
   *       // doSomethingWith(result);
   *     });
   *
   *     // Adding a listener for the "progress" event causes the callback to be
   *     // called on any change in metadata when the operation is polled.
   *     operation.on('progress', (metadata, apiResponse) => {
   *       // doSomethingWith(metadata)
   *     });
   *
   *     // Adding a listener for the "error" event handles any errors found during polling.
   *     operation.on('error', err => {
   *       // throw(err);
   *     });
   *   })
   *   .catch(err => {
   *     console.error(err);
   *   });
   *
   * const parent = '';
   * const outputConfig = {};
   * const request = {
   *   parent: parent,
   *   outputConfig: outputConfig,
   * };
   *
   * // Handle the operation using the await pattern.
   * const [operation] = await client.exportAssets(request);
   *
   * const [response] = await operation.promise();
   */
  exportAssets(request, options, callback) {
    if (options instanceof Function && callback === undefined) {
      callback = options;
      options = {};
    }
    request = request || {};
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      parent: request.parent,
    });

    return this._innerApiCalls.exportAssets(request, options, callback);
  }

  /**
   * Batch gets the update history of assets that overlap a time window.
   * For RESOURCE content, this API outputs history with asset in both
   * non-delete or deleted status.
   * For IAM_POLICY content, this API outputs history when the asset and its
   * attached IAM POLICY both exist. This can create gaps in the output history.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.parent
   *   Required. The relative name of the root asset. It can only be an
   *   organization number (such as "organizations/123"), a project ID (such as
   *   "projects/my-project-id")", or a project number (such as "projects/12345").
   * @param {string[]} request.assetNames
   *   A list of the full names of the assets. For example:
   *   `//compute.googleapis.com/projects/my_project_123/zones/zone1/instances/instance1`.
   *   See [Resource
   *   Names](https://cloud.google.com/apis/design/resource_names#full_resource_name)
   *   and [Resource Name
   *   Format](https://cloud.google.com/resource-manager/docs/cloud-asset-inventory/resource-name-format)
   *   for more info.
   *
   *   The request becomes a no-op if the asset name list is empty, and the max
   *   size of the asset name list is 100 in one request.
   * @param {number} request.contentType
   *   Required. The content type.
   *
   *   The number should be among the values of [ContentType]{@link google.cloud.asset.v1p2beta1.ContentType}
   * @param {Object} [request.readTimeWindow]
   *   Optional. The time window for the asset history. Both start_time and
   *   end_time are optional and if set, it must be after 2018-10-02 UTC. If
   *   end_time is not set, it is default to current timestamp. If start_time is
   *   not set, the snapshot of the assets at end_time will be returned. The
   *   returned results contain all temporal assets whose time window overlap with
   *   read_time_window.
   *
   *   This object should have the same structure as [TimeWindow]{@link google.cloud.asset.v1p2beta1.TimeWindow}
   * @param {Object} [options]
   *   Optional parameters. You can override the default settings for this call, e.g, timeout,
   *   retries, paginations, etc. See [gax.CallOptions]{@link https://googleapis.github.io/gax-nodejs/interfaces/CallOptions.html} for the details.
   * @param {function(?Error, ?Object)} [callback]
   *   The function which will be called with the result of the API call.
   *
   *   The second parameter to the callback is an object representing [BatchGetAssetsHistoryResponse]{@link google.cloud.asset.v1p2beta1.BatchGetAssetsHistoryResponse}.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [BatchGetAssetsHistoryResponse]{@link google.cloud.asset.v1p2beta1.BatchGetAssetsHistoryResponse}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   *
   * @example
   *
   * const asset = require('asset.v1p2beta1');
   *
   * const client = new asset.v1p2beta1.AssetServiceClient({
   *   // optional auth parameters.
   * });
   *
   * const parent = '';
   * const assetNames = [];
   * const contentType = 'CONTENT_TYPE_UNSPECIFIED';
   * const request = {
   *   parent: parent,
   *   assetNames: assetNames,
   *   contentType: contentType,
   * };
   * client.batchGetAssetsHistory(request)
   *   .then(responses => {
   *     const response = responses[0];
   *     // doThingsWith(response)
   *   })
   *   .catch(err => {
   *     console.error(err);
   *   });
   */
  batchGetAssetsHistory(request, options, callback) {
    if (options instanceof Function && callback === undefined) {
      callback = options;
      options = {};
    }
    request = request || {};
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      parent: request.parent,
    });

    return this._innerApiCalls.batchGetAssetsHistory(
      request,
      options,
      callback
    );
  }

  /**
   * Creates a feed in a parent project/folder/organization to listen to its
   * asset updates.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.parent
   *   Required. The name of the project/folder/organization where this feed
   *   should be created in. It can only be an organization number (such as
   *   "organizations/123"), a folder number (such as "folders/123"), a project ID
   *   (such as "projects/my-project-id")", or a project number (such as
   *   "projects/12345").
   * @param {string} request.feedId
   *   Required. This is the client-assigned asset feed identifier and it needs to
   *   be unique under a specific parent project/folder/organization.
   * @param {Object} request.feed
   *   The feed details. The field `name` must be empty and it will be generated
   *   in the format of:
   *   projects/project_number/feeds/feed_id
   *   folders/folder_number/feeds/feed_id
   *   organizations/organization_number/feeds/feed_id
   *
   *   This object should have the same structure as [Feed]{@link google.cloud.asset.v1p2beta1.Feed}
   * @param {Object} [options]
   *   Optional parameters. You can override the default settings for this call, e.g, timeout,
   *   retries, paginations, etc. See [gax.CallOptions]{@link https://googleapis.github.io/gax-nodejs/interfaces/CallOptions.html} for the details.
   * @param {function(?Error, ?Object)} [callback]
   *   The function which will be called with the result of the API call.
   *
   *   The second parameter to the callback is an object representing [Feed]{@link google.cloud.asset.v1p2beta1.Feed}.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [Feed]{@link google.cloud.asset.v1p2beta1.Feed}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   *
   * @example
   *
   * const asset = require('asset.v1p2beta1');
   *
   * const client = new asset.v1p2beta1.AssetServiceClient({
   *   // optional auth parameters.
   * });
   *
   * const parent = '';
   * const feedId = '';
   * const feed = {};
   * const request = {
   *   parent: parent,
   *   feedId: feedId,
   *   feed: feed,
   * };
   * client.createFeed(request)
   *   .then(responses => {
   *     const response = responses[0];
   *     // doThingsWith(response)
   *   })
   *   .catch(err => {
   *     console.error(err);
   *   });
   */
  createFeed(request, options, callback) {
    if (options instanceof Function && callback === undefined) {
      callback = options;
      options = {};
    }
    request = request || {};
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      parent: request.parent,
    });

    return this._innerApiCalls.createFeed(request, options, callback);
  }

  /**
   * Gets details about an asset feed.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.name
   *   The name of the Feed and it must be in the format of:
   *   projects/project_number/feeds/feed_id
   *   folders/folder_number/feeds/feed_id
   *   organizations/organization_number/feeds/feed_id
   * @param {Object} [options]
   *   Optional parameters. You can override the default settings for this call, e.g, timeout,
   *   retries, paginations, etc. See [gax.CallOptions]{@link https://googleapis.github.io/gax-nodejs/interfaces/CallOptions.html} for the details.
   * @param {function(?Error, ?Object)} [callback]
   *   The function which will be called with the result of the API call.
   *
   *   The second parameter to the callback is an object representing [Feed]{@link google.cloud.asset.v1p2beta1.Feed}.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [Feed]{@link google.cloud.asset.v1p2beta1.Feed}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   *
   * @example
   *
   * const asset = require('asset.v1p2beta1');
   *
   * const client = new asset.v1p2beta1.AssetServiceClient({
   *   // optional auth parameters.
   * });
   *
   * const formattedName = client.feedPath('[PROJECT]', '[FEED]');
   * client.getFeed({name: formattedName})
   *   .then(responses => {
   *     const response = responses[0];
   *     // doThingsWith(response)
   *   })
   *   .catch(err => {
   *     console.error(err);
   *   });
   */
  getFeed(request, options, callback) {
    if (options instanceof Function && callback === undefined) {
      callback = options;
      options = {};
    }
    request = request || {};
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      name: request.name,
    });

    return this._innerApiCalls.getFeed(request, options, callback);
  }

  /**
   * Lists all asset feeds in a parent project/folder/organization.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.parent
   *   Required. The parent project/folder/organization whose feeds are to be
   *   listed. It can only be using project/folder/organization number (such as
   *   "folders/12345")", or a project ID (such as "projects/my-project-id").
   * @param {Object} [options]
   *   Optional parameters. You can override the default settings for this call, e.g, timeout,
   *   retries, paginations, etc. See [gax.CallOptions]{@link https://googleapis.github.io/gax-nodejs/interfaces/CallOptions.html} for the details.
   * @param {function(?Error, ?Object)} [callback]
   *   The function which will be called with the result of the API call.
   *
   *   The second parameter to the callback is an object representing [ListFeedsResponse]{@link google.cloud.asset.v1p2beta1.ListFeedsResponse}.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [ListFeedsResponse]{@link google.cloud.asset.v1p2beta1.ListFeedsResponse}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   *
   * @example
   *
   * const asset = require('asset.v1p2beta1');
   *
   * const client = new asset.v1p2beta1.AssetServiceClient({
   *   // optional auth parameters.
   * });
   *
   * const parent = '';
   * client.listFeeds({parent: parent})
   *   .then(responses => {
   *     const response = responses[0];
   *     // doThingsWith(response)
   *   })
   *   .catch(err => {
   *     console.error(err);
   *   });
   */
  listFeeds(request, options, callback) {
    if (options instanceof Function && callback === undefined) {
      callback = options;
      options = {};
    }
    request = request || {};
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      parent: request.parent,
    });

    return this._innerApiCalls.listFeeds(request, options, callback);
  }

  /**
   * Updates an asset feed configuration.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {Object} request.feed
   *   The new values of feed details. It must match an existing feed and the
   *   field `name` must be in the format of:
   *   projects/project_number/feeds/feed_id or
   *   folders/folder_number/feeds/feed_id or
   *   organizations/organization_number/feeds/feed_id.
   *
   *   This object should have the same structure as [Feed]{@link google.cloud.asset.v1p2beta1.Feed}
   * @param {Object} request.updateMask
   *   Only updates the `feed` fields indicated by this mask.
   *   The field mask must not be empty, and it must not contain fields that
   *   are immutable or only set by the server.
   *
   *   This object should have the same structure as [FieldMask]{@link google.protobuf.FieldMask}
   * @param {Object} [options]
   *   Optional parameters. You can override the default settings for this call, e.g, timeout,
   *   retries, paginations, etc. See [gax.CallOptions]{@link https://googleapis.github.io/gax-nodejs/interfaces/CallOptions.html} for the details.
   * @param {function(?Error, ?Object)} [callback]
   *   The function which will be called with the result of the API call.
   *
   *   The second parameter to the callback is an object representing [Feed]{@link google.cloud.asset.v1p2beta1.Feed}.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [Feed]{@link google.cloud.asset.v1p2beta1.Feed}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   *
   * @example
   *
   * const asset = require('asset.v1p2beta1');
   *
   * const client = new asset.v1p2beta1.AssetServiceClient({
   *   // optional auth parameters.
   * });
   *
   * const feed = {};
   * const updateMask = {};
   * const request = {
   *   feed: feed,
   *   updateMask: updateMask,
   * };
   * client.updateFeed(request)
   *   .then(responses => {
   *     const response = responses[0];
   *     // doThingsWith(response)
   *   })
   *   .catch(err => {
   *     console.error(err);
   *   });
   */
  updateFeed(request, options, callback) {
    if (options instanceof Function && callback === undefined) {
      callback = options;
      options = {};
    }
    request = request || {};
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      'feed.name': request.feed.name,
    });

    return this._innerApiCalls.updateFeed(request, options, callback);
  }

  /**
   * Deletes an asset feed.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.name
   *   The name of the feed and it must be in the format of:
   *   projects/project_number/feeds/feed_id
   *   folders/folder_number/feeds/feed_id
   *   organizations/organization_number/feeds/feed_id
   * @param {Object} [options]
   *   Optional parameters. You can override the default settings for this call, e.g, timeout,
   *   retries, paginations, etc. See [gax.CallOptions]{@link https://googleapis.github.io/gax-nodejs/interfaces/CallOptions.html} for the details.
   * @param {function(?Error)} [callback]
   *   The function which will be called with the result of the API call.
   * @returns {Promise} - The promise which resolves when API call finishes.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   *
   * @example
   *
   * const asset = require('asset.v1p2beta1');
   *
   * const client = new asset.v1p2beta1.AssetServiceClient({
   *   // optional auth parameters.
   * });
   *
   * const formattedName = client.feedPath('[PROJECT]', '[FEED]');
   * client.deleteFeed({name: formattedName}).catch(err => {
   *   console.error(err);
   * });
   */
  deleteFeed(request, options, callback) {
    if (options instanceof Function && callback === undefined) {
      callback = options;
      options = {};
    }
    request = request || {};
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      name: request.name,
    });

    return this._innerApiCalls.deleteFeed(request, options, callback);
  }

  // --------------------
  // -- Path templates --
  // --------------------

  /**
   * Return a fully-qualified feed resource name string.
   *
   * @param {String} project
   * @param {String} feed
   * @returns {String}
   */
  feedPath(project, feed) {
    return this._pathTemplates.feedPathTemplate.render({
      project: project,
      feed: feed,
    });
  }

  /**
   * Parse the feedName from a feed resource.
   *
   * @param {String} feedName
   *   A fully-qualified path representing a feed resources.
   * @returns {String} - A string representing the project.
   */
  matchProjectFromFeedName(feedName) {
    return this._pathTemplates.feedPathTemplate.match(feedName).project;
  }

  /**
   * Parse the feedName from a feed resource.
   *
   * @param {String} feedName
   *   A fully-qualified path representing a feed resources.
   * @returns {String} - A string representing the feed.
   */
  matchFeedFromFeedName(feedName) {
    return this._pathTemplates.feedPathTemplate.match(feedName).feed;
  }
}

module.exports = AssetServiceClient;
