[//]: # "This README.md file is auto-generated, all changes to this file will be lost."
[//]: # "To regenerate it, use `python -m synthtool`."
<img src="https://avatars2.githubusercontent.com/u/2810941?v=3&s=96" alt="Google Cloud Platform logo" title="Google Cloud Platform" align="right" height="96" width="96"/>

# [Cloud Asset Inventory: Node.js Samples](https://github.com/googleapis/nodejs-asset)

[![Open in Cloud Shell][shell_img]][shell_link]



## Table of Contents

* [Before you begin](#before-you-begin)
* [Samples](#samples)
  * [Create Feed](#create-feed)
  * [Delete Feed](#delete-feed)
  * [Export Assets](#export-assets)
  * [Get Batch Asset History](#get-batch-asset-history)
  * [Get Feed](#get-feed)
  * [List Feeds](#list-feeds)
  * [Asset History Quickstart](#asset-history-quickstart)
  * [Update Feed](#update-feed)

## Before you begin

Before running the samples, make sure you've followed the steps outlined in
[Using the client library](https://github.com/googleapis/nodejs-asset#using-the-client-library).

## Samples



### Create Feed

Create Feed.

View the [source code](https://github.com/googleapis/nodejs-asset/blob/master/samples/createFeed.js).

[![Open in Cloud Shell][shell_img]](https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/googleapis/nodejs-asset&page=editor&open_in_editor=samples/createFeed.js,samples/README.md)

__Usage:__


`node createFeed <FEED_ID> "storage.googleapis.com/<BUCKET_NAME>", projects/<PROJECT_ID>/topics/<TOPIC_ID>`


-----




### Delete Feed

Delete Feed.

View the [source code](https://github.com/googleapis/nodejs-asset/blob/master/samples/deleteFeed.js).

[![Open in Cloud Shell][shell_img]](https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/googleapis/nodejs-asset&page=editor&open_in_editor=samples/deleteFeed.js,samples/README.md)

__Usage:__


`node deleteFeed "project/<PROJECT_NUMBER>/feeds/<FEED_ID>"`


-----




### Export Assets

Export asserts to specified dump file path.

View the [source code](https://github.com/googleapis/nodejs-asset/blob/master/samples/exportAssets.js).

[![Open in Cloud Shell][shell_img]](https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/googleapis/nodejs-asset&page=editor&open_in_editor=samples/exportAssets.js,samples/README.md)

__Usage:__


`node exportAssets.js <gs:my-bucket/my-assets.txt>`


-----




### Get Batch Asset History

Batch get history of assets.

View the [source code](https://github.com/googleapis/nodejs-asset/blob/master/samples/getBatchAssetHistory.js).

[![Open in Cloud Shell][shell_img]](https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/googleapis/nodejs-asset&page=editor&open_in_editor=samples/getBatchAssetHistory.js,samples/README.md)

__Usage:__


`node getBatchAssetHistory "storage.googleapis.com/<BUCKET_NAME>"`


-----




### Get Feed

Get Feed.

View the [source code](https://github.com/googleapis/nodejs-asset/blob/master/samples/getFeed.js).

[![Open in Cloud Shell][shell_img]](https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/googleapis/nodejs-asset&page=editor&open_in_editor=samples/getFeed.js,samples/README.md)

__Usage:__


`node getFeed "project/<PROJECT_NUMBER>/feeds/<FEED_ID>"`


-----




### List Feeds

List Feeds.

View the [source code](https://github.com/googleapis/nodejs-asset/blob/master/samples/listFeeds.js).

[![Open in Cloud Shell][shell_img]](https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/googleapis/nodejs-asset&page=editor&open_in_editor=samples/listFeeds.js,samples/README.md)

__Usage:__


`node listFeeds`


-----




### Asset History Quickstart

Batch get history of assets.

View the [source code](https://github.com/googleapis/nodejs-asset/blob/master/samples/quickstart.js).

[![Open in Cloud Shell][shell_img]](https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/googleapis/nodejs-asset&page=editor&open_in_editor=samples/quickstart.js,samples/README.md)

__Usage:__


`node getBatchAssetHistory "storage.googleapis.com/<BUCKET_NAME>"`


-----




### Update Feed

Update Feed.

View the [source code](https://github.com/googleapis/nodejs-asset/blob/master/samples/updateFeed.js).

[![Open in Cloud Shell][shell_img]](https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/googleapis/nodejs-asset&page=editor&open_in_editor=samples/updateFeed.js,samples/README.md)

__Usage:__


`node updateFeed "project/<PROJECT_NUMBER>/feeds/<FEED_ID>" projects/<PROJECT_ID>/topics/<TOPIC_ID>`






[shell_img]: https://gstatic.com/cloudssh/images/open-btn.png
[shell_link]: https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/googleapis/nodejs-asset&page=editor&open_in_editor=samples/README.md
[product-docs]: https://cloud.google.com/resource-manager/docs/cloud-asset-inventory/overview