'use strict';

const argparse = require('argparse');
const DataPlanningController = require('./data_planning_controller');

const parser = argparse.ArgumentParser();
parser.add_argument('-ws', { help: 'workspace id', type: 'int', required: true });
const subparsers = parser.add_subparsers();

const validate_parser = subparsers.add_parser('validate', { help: 'validate event batch' });
validate_parser.add_argument('-validate', { help: 'validate event batch', type: 'str', required: false });
validate_parser.set_defaults({validate: true});

const plan_parser = subparsers.add_parser('plan', { help: 'data plan actions' });
plan_parser.add_argument('-plan_id', { help: 'data plan id', type: 'str', required: false });
plan_parser.add_argument('command', { help: 'list, create, get, update, delete', type: 'str' });

const version_parser = subparsers.add_parser('version', { help: 'data plan version actions' });
version_parser.add_argument('-plan_id', { help: 'data plan id', type: 'str', required: true });
version_parser.add_argument('-plan_version', { help: 'data plan version', type: 'int', required: false });
version_parser.add_argument('command', { help: 'create, get, update, delete', type: 'str' });
version_parser.set_defaults({version: true});

const args = parser.parse_args();
console.log("Arguments: ", args);

const dpc = new DataPlanningController();

if (args.validate) {
    const dataplan_version_file = "json/create_higgs_shop_basic_data_plan_version2.json";
    const batch_file = "json/event_batch.json";
    dpc.validate_event_batch(args.ws, dataplan_version_file, batch_file);
} else if (args.plan_id) {
    if (args.version) {
        if (args.plan_version) {
            if (args.command == "get") {
                const file_name = `plan_${args.plan_id}_version${args.plan_version}.json`;
                dpc.download_plan_version(args.ws, args.plan_id, args.plan_version, file_name);
            } else if (args.command == "update") {
                const file_name = "json/update_higgs_shop_basic_data_plan_version2.json";
                dpc.update_plan_version(args.ws, args.plan_id, args.plan_version, file_name);
            } else if (args.command == "delete") {
                dpc.delete_plan_version(args.ws, args.plan_id, args.plan_version);
            }
        } else if (args.command == "create") {
            const file_name = "json/create_higgs_shop_basic_data_plan_version2.json";
            dpc.create_plan_version(args.ws, args.plan_id, file_name);
        }
    } else if (args.command == "get") {
        const file_name = `plan_${args.plan_id}_.json`;
        dpc.download_plan(args.ws, args.plan_id, file_name);
    } else if (args.command == "update") {
        const file_name = "json/update_higgs_shop_basic_data_plan.json";
        dpc.update_plan(args.ws, args.plan_id, file_name);
    } else if (args.command == "delete") {
        dpc.delete_plan(args.ws, args.plan_id);
    }
} else if (args.command == "list") {
    dpc.download_plans(args.ws, "plans.json");
} else if (args.command == "create") {
    const file_name = "json/create_higgs_shop_basic_data_plan.json";
    dpc.create_plan(args.ws, file_name);
}
