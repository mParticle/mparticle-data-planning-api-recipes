# Data Planning API Python Recipes
Recipes for automating data planning related workflows with the Data Planning API.

For more information, see the Open API specification for the [Data Planning API](https://docs.mparticle.com/developers/dataplanning-api/#open-api)

## Getting started
1. Install dependencies with pip: `pip install -r requirements.txt`
2. Generate [Platform API credentials](https://docs.mparticle.com/developers/credential-management/)
    - Enter the credentials in the `mp_config.json` file.

## Recipes
The following recipes are demonstrated in this project:
* create a data plan
* download a data plan
* download a data plan version
* upload a data plan version
* validate an event batch against a data plan

Every recipe requires that you provide a Workspace ID via the `-ws` parameter in the command line.
- Find your workspace id on the [workspace settings page](https://app.mparticle.com/workspaces).

Run `python recipes.py -h` for additonal help.

### Recipe 1: Create a data plan
This recipe will create the Higgs Shop Basic Data Plan in the specified workspace. This is the same data plan used by the [Higgs Shop sample app](https://github.com/mParticle/mparticle-web-sample-apps).

```python recipes.py -ws=7505 plan create```

### Recipe 2: Download all data plans
This recipe will download all data plans in a given workspace.

```python recipes.py -ws=7505 plan list```


### Recipe 3: Download a single data plan
This recipe will download a single data plan in a given workspace.

```python recipes.py -ws=7505 plan get -plan_id=higgs_shop_basic_data_plan```

### Recipe 4: Update a single data plan
This recipe will download a single data plan in a given workspace.

```python recipes.py -ws=7505 plan update -plan_id=higgs_shop_basic_data_plan```

### Recipe 5: Delete a single data plan
This recipe will delete a single data plan in a given workspace.

```python recipes.py -ws=7505 plan delete -plan_id=higgs_shop_basic_data_plan```

### Recipe 6: Create a new plan version
Create version 2 in `Higgs Shop Basic Data Plan`.

```python recipes.py -ws=7505 version create -plan_id=higgs_shop_basic_data_plan```

### Recipe 7: Download data plan version
Download version 2 of `Higgs Shop Basic Data Plan`.

```python recipes.py -ws=7505 version get -plan_id=higgs_shop_basic_data_plan -plan_version=2```

### Recipe 8: Update a data plan version
Update version 2 in `Higgs Shop Basic Data Plan`.

```python recipes.py -ws=7505 version update -plan_id=higgs_shop_basic_data_plan -plan_version=2```

### Recipe 9: Delete a data plan version
Delete version 2 in `Higgs Shop Basic Data Plan`.

```python recipes.py -ws=7505 version delete -plan_id=higgs_shop_basic_data_plan -plan_version=2```
