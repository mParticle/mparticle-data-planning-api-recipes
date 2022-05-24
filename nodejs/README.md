# Data Planning API Node JS Recipes
Recipes for automating data planning related workflows with the Data Planning API.

For more information, see the Open API specification for the [Data Planning API](https://docs.mparticle.com/developers/dataplanning-api/#open-api)

## Getting started
1. Install dependencies with npm: `npm install`
2. Generate [Platform API credentials](https://docs.mparticle.com/developers/credential-management/)
3. Enter the credentials in the `mp_config.json` file.

Example contents of `mp_config.json`:
```json
{
    "platform_api_key": "YOUR API KEY",
    "platform_api_secret": "YOUR API SECRET"
}
```

## Recipes
The following recipes are demonstrated in this project:
* create a data plan
* download all data plans 
* download a single data plan
* update a single data plan
* delete a single data plan
* create a new data plan version
* download a data plan version
* update a data plan version
* delete a data plan version
* validate an event batch against a data plan

Every recipe requires that you provide a Workspace ID via the `-ws` parameter in the command line.
- Find your workspace id on the [workspace settings page](https://app.mparticle.com/workspaces).

Run `node recipes.js -h` for additonal help.

### Recipe 1: Create a data plan
This recipe will create the Higgs Shop Basic Data Plan in the specified workspace. This is the same data plan used by the [Higgs Shop sample app](https://github.com/mParticle/mparticle-web-sample-apps).

```node recipes.js -ws=7505 plan create```

### Recipe 2: Download all data plans
This recipe will download all data plans in a given workspace.

```node recipes.js -ws=7505 plan list```


### Recipe 3: Download a single data plan
This recipe will download a single data plan in a given workspace.

```node recipes.js -ws=7505 plan get -plan_id=higgs_shop_basic_data_plan```

### Recipe 4: Update a single data plan
This recipe will update a single data plan in a given workspace.

```node recipes.js -ws=7505 plan update -plan_id=higgs_shop_basic_data_plan```

### Recipe 5: Delete a single data plan
This recipe will delete a single data plan in a given workspace.

```node recipes.js -ws=7505 plan delete -plan_id=higgs_shop_basic_data_plan```

### Recipe 6: Create a new plan version
Create version 2 in `Higgs Shop Basic Data Plan`.

```node recipes.js -ws=7505 version create -plan_id=higgs_shop_basic_data_plan```

### Recipe 7: Download data plan version
Download version 2 of `Higgs Shop Basic Data Plan`.

```node recipes.js -ws=7505 version get -plan_id=higgs_shop_basic_data_plan -plan_version=2```

### Recipe 8: Update a data plan version
Update version 2 in `Higgs Shop Basic Data Plan`.

```node recipes.js -ws=7505 version update -plan_id=higgs_shop_basic_data_plan -plan_version=2```

### Recipe 9: Delete a data plan version
Delete version 2 in `Higgs Shop Basic Data Plan`.

```node recipes.js -ws=7505 version delete -plan_id=higgs_shop_basic_data_plan -plan_version=2```

### Recipe 10: Validate batch
Validate an event batch against the `Higgs Shop Basic Data Plan` data plan.

```node recipes.js -ws=7505 validate```
