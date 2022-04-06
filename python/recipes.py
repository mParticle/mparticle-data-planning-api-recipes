import argparse
import json
import pdb
import sys
from data_planning_service import DataPlanningService

def create_plan(workspace_id, fname):
    dps = DataPlanningService("mp_config.json")
    plan = dps.create_data_plan(workspace_id, fname)
    print(plan)

def download_plans(workspace_id, fname):
    dps = DataPlanningService("mp_config.json")
    data_plans = dps.download_data_plans(workspace_id)
    
    # write file to disk
    f = open(fname, "w")
    f.write(json.dumps(data_plans, indent = 2))
    f.close()

def download_plan(workspace_id, plan_id, fname):
    dps = DataPlanningService("mp_config.json")
    data_plan = dps.download_data_plan(workspace_id, plan_id)
    
    # write file to disk
    f = open(fname, "w")
    f.write(json.dumps(data_plan, indent = 2))
    f.close()
    print("Saved data plan to %s" % fname)

def update_plan(workspace_id, plan_id, fname):
    dps = DataPlanningService("mp_config.json")
    data_plan = dps.update_data_plan(workspace_id, plan_id, fname)
    
    # write file to disk
    f = open(fname, "w")
    f.write(json.dumps(data_plan, indent = 2))
    f.close()
    print("Updated data plan")

def delete_plan(workspace_id, plan_id):
    dps = DataPlanningService("mp_config.json")
    dps.delete_data_plan(workspace_id, plan_id)
    print("Data plan deleted")

def download_plan_version(workspace_id, plan_id, plan_version, fname):
    dps = DataPlanningService("mp_config.json")
    plan_version = dps.download_data_plan_version(workspace_id, plan_id, plan_version)
    
    # write file to disk
    f = open(fname, "w")
    f.write(json.dumps(plan_version, indent = 2))
    f.close()

def create_plan_version(workspace_id, plan_id, fname):
    dps = DataPlanningService("mp_config.json")
    new_version = dps.create_data_plan_version(workspace_id, plan_id, fname)
    print("Version created: %s" % new_version["version"])

def update_plan_version(workspace_id, plan_id, plan_version, fname):
    dps = DataPlanningService("mp_config.json")
    plan_version = dps.update_data_plan_version(workspace_id, plan_id, plan_version, fname)
    print("Version updated")

def delete_plan_version(workspace_id, plan_id, plan_version):
    dps = DataPlanningService("mp_config.json")
    dps.delete_data_plan_version(workspace_id, plan_id, plan_version)
    print("Version deleted: %s" % plan_version)

def validate_event_batch(workspace_id, dataplan_version_file, batch_file):
    dps = DataPlanningService("mp_config.json")
    results = dps.validate_batch(workspace_id, dataplan_version_file, batch_file)
    print("Validation results: %s" % results)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("-ws", help="workspace id", type=int, required=True)
    subparsers = parser.add_subparsers()
    
    validate_parser = subparsers.add_parser('validate', help='validate event batch')
    validate_parser.add_argument("-validate", help="validate event batch", type=str, required=False)
    validate_parser.set_defaults(validate=True)

    plan_parser = subparsers.add_parser('plan', help='data plan actions')
    plan_parser.add_argument("-plan_id", help="data plan id", type=str, required=False)
    plan_parser.add_argument("command", help="list, create, get, update, delete", type=str)

    version_parser = subparsers.add_parser('version', help='data plan version actions')
    version_parser.add_argument("-plan_id", help="data plan id", type=str, required=True)
    version_parser.add_argument("-plan_version", help="data plan version", type=int, required=False)
    version_parser.add_argument("command", help="create, get, update, delete", type=str)
    
    args = parser.parse_args()
    print(args)

    if args.validate != None:
        dataplan_version_file = "json/create_higgs_shop_basic_data_plan_version2.json"
        batch_file = "json/event_batch.json"
        validate_event_batch(args.ws, dataplan_version_file, batch_file)
    elif args.plan_id != None:
        if hasattr(args, "plan_version"):
            if args.command == "get":
                file_name = "plan_%s_version%s.json" % (args.plan_id, args.plan_version)
                download_plan_version(args.ws, args.plan_id, args.plan_version, file_name)
            elif args.command == "update":
                file_name = "json/update_higgs_shop_basic_data_plan_version2.json"
                update_plan_version(args.ws, args.plan_id, args.plan_version, file_name)
            elif args.command == "delete":
                delete_plan_version(args.ws, args.plan_id, args.plan_version)
            elif args.command == "create":
                file_name = "json/create_higgs_shop_basic_data_plan_version2.json"
                create_plan_version(args.ws, args.plan_id, file_name)
        elif args.command == "get":
            file_name = "plan_" + args.plan_id + "_.json"
            download_plan(args.ws, args.plan_id, file_name)
        elif args.command == "update":
            file_name = "json/update_higgs_shop_basic_data_plan.json"
            update_plan(args.ws, args.plan_id, file_name)
        elif args.command == "delete":
            delete_plan(args.ws, args.plan_id)
    elif args.command == "list":
        download_plans(args.ws, "plans.json")
    elif args.command == "create":
        file_name = "json/create_higgs_shop_basic_data_plan.json"
        create_plan(args.ws, file_name)

