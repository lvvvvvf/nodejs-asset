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

// Note: this file is purely for documentation. Any contents are not expected
// to be loaded as the JS file.

/**
 * Export asset request.
 *
 * @property {string} parent
 *   Required. The relative name of the root asset. This can only be an
 *   organization number (such as "organizations/123"), a project ID (such as
 *   "projects/my-project-id"), a project number (such as "projects/12345"), or
 *   a folder number (such as "folders/123").
 *
 * @property {Object} readTime
 *   Timestamp to take an asset snapshot. This can only be set to a timestamp
 *   between 2018-10-02 UTC (inclusive) and the current time. If not specified,
 *   the current time will be used. Due to delays in resource data collection
 *   and indexing, there is a volatile window during which running the same
 *   query may get different results.
 *
 *   This object should have the same structure as [Timestamp]{@link google.protobuf.Timestamp}
 *
 * @property {string[]} assetTypes
 *   A list of asset types of which to take a snapshot for. For example:
 *   "google.compute.Disk". If specified, only matching assets will be returned.
 *   See [Introduction to Cloud Asset
 *   Inventory](https://cloud.google.com/resource-manager/docs/cloud-asset-inventory/overview)
 *   for all supported asset types.
 *
 * @property {number} contentType
 *   Asset content type. If not specified, no content but the asset name will be
 *   returned.
 *
 *   The number should be among the values of [ContentType]{@link google.cloud.asset.v1beta1.ContentType}
 *
 * @property {Object} outputConfig
 *   Required. Output configuration indicating where the results will be output
 *   to. All results will be in newline delimited JSON format.
 *
 *   This object should have the same structure as [OutputConfig]{@link google.cloud.asset.v1beta1.OutputConfig}
 *
 * @typedef ExportAssetsRequest
 * @memberof google.cloud.asset.v1beta1
 * @see [google.cloud.asset.v1beta1.ExportAssetsRequest definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/cloud/asset/v1beta1/asset_service.proto}
 */
const ExportAssetsRequest = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * The export asset response. This message is returned by the
 * google.longrunning.Operations.GetOperation
 * method in the returned
 * google.longrunning.Operation.response
 * field.
 *
 * @property {Object} readTime
 *   Time the snapshot was taken.
 *
 *   This object should have the same structure as [Timestamp]{@link google.protobuf.Timestamp}
 *
 * @property {Object} outputConfig
 *   Output configuration indicating where the results were output to.
 *   All results are in JSON format.
 *
 *   This object should have the same structure as [OutputConfig]{@link google.cloud.asset.v1beta1.OutputConfig}
 *
 * @typedef ExportAssetsResponse
 * @memberof google.cloud.asset.v1beta1
 * @see [google.cloud.asset.v1beta1.ExportAssetsResponse definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/cloud/asset/v1beta1/asset_service.proto}
 */
const ExportAssetsResponse = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * Batch get assets history request.
 *
 * @property {string} parent
 *   Required. The relative name of the root asset. It can only be an
 *   organization number (such as "organizations/123"), a project ID (such as
 *   "projects/my-project-id")", or a project number (such as "projects/12345").
 *
 * @property {string[]} assetNames
 *   A list of the full names of the assets. For example:
 *   `//compute.googleapis.com/projects/my_project_123/zones/zone1/instances/instance1`.
 *   See [Resource
 *   Names](https://cloud.google.com/apis/design/resource_names#full_resource_name)
 *   for more info.
 *
 *   The request becomes a no-op if the asset name list is empty, and the max
 *   size of the asset name list is 100 in one request.
 *
 * @property {number} contentType
 *   Required. The content type.
 *
 *   The number should be among the values of [ContentType]{@link google.cloud.asset.v1beta1.ContentType}
 *
 * @property {Object} readTimeWindow
 *   Optional. The time window for the asset history. Both start_time and
 *   end_time are optional and if set, it must be after 2018-10-02 UTC. If
 *   end_time is not set, it is default to current timestamp. If start_time is
 *   not set, the snapshot of the assets at end_time will be returned. The
 *   returned results contain all temporal assets whose time window overlap with
 *   read_time_window.
 *
 *   This object should have the same structure as [TimeWindow]{@link google.cloud.asset.v1beta1.TimeWindow}
 *
 * @typedef BatchGetAssetsHistoryRequest
 * @memberof google.cloud.asset.v1beta1
 * @see [google.cloud.asset.v1beta1.BatchGetAssetsHistoryRequest definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/cloud/asset/v1beta1/asset_service.proto}
 */
const BatchGetAssetsHistoryRequest = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * Batch get assets history response.
 *
 * @property {Object[]} assets
 *   A list of assets with valid time windows.
 *
 *   This object should have the same structure as [TemporalAsset]{@link google.cloud.asset.v1beta1.TemporalAsset}
 *
 * @typedef BatchGetAssetsHistoryResponse
 * @memberof google.cloud.asset.v1beta1
 * @see [google.cloud.asset.v1beta1.BatchGetAssetsHistoryResponse definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/cloud/asset/v1beta1/asset_service.proto}
 */
const BatchGetAssetsHistoryResponse = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * Output configuration for export assets destination.
 *
 * @property {Object} gcsDestination
 *   Destination on Cloud Storage.
 *
 *   This object should have the same structure as [GcsDestination]{@link google.cloud.asset.v1beta1.GcsDestination}
 *
 * @typedef OutputConfig
 * @memberof google.cloud.asset.v1beta1
 * @see [google.cloud.asset.v1beta1.OutputConfig definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/cloud/asset/v1beta1/asset_service.proto}
 */
const OutputConfig = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * A Cloud Storage location.
 *
 * @property {string} uri
 *   The uri of the Cloud Storage object. It's the same uri that is used by
 *   gsutil. For example: "gs://bucket_name/object_name". See [Viewing and
 *   Editing Object
 *   Metadata](https://cloud.google.com/storage/docs/viewing-editing-metadata)
 *   for more information.
 *
 * @typedef GcsDestination
 * @memberof google.cloud.asset.v1beta1
 * @see [google.cloud.asset.v1beta1.GcsDestination definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/cloud/asset/v1beta1/asset_service.proto}
 */
const GcsDestination = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * Asset content type.
 *
 * @enum {number}
 * @memberof google.cloud.asset.v1beta1
 */
const ContentType = {

  /**
   * Unspecified content type.
   */
  CONTENT_TYPE_UNSPECIFIED: 0,

  /**
   * Resource metadata.
   */
  RESOURCE: 1,

  /**
   * The actual IAM policy set on a resource.
   */
  IAM_POLICY: 2
};