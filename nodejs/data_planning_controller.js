'use strict';

const fs = require('fs');
const DataPlanningService = require('./data_planning_service');

function handleError(error) {
    console.log(error.message);
    if (error.response && error.response.data) {
        console.log(error.response.data);
    }
}

function saveResponseToFile(res, fname, notificationMessage) {
    const data_plans = JSON.stringify(res.data);
    fs.writeFileSync(fname, data_plans);
    console.log(notificationMessage);
}

module.exports = class DataPlanningController {
    dps = null;

    constructor() {
        this.dps = new DataPlanningService();
    }

    async create_plan(workspace_id, fname) {
        try {
            await this.dps.init("mp_config.json");
            const res = await this.dps.create_data_plan(workspace_id, fname);
            console.log(res.data);
        } catch(error) {
            handleError(error);
        }
    }
    
    async download_plans(workspace_id, fname) {
        try {
            await this.dps.init("mp_config.json");
            const res = await this.dps.download_data_plans(workspace_id);

            // write file to disk
            saveResponseToFile(res, fname, `Plans downloaded successfully to ${fname}`);
        } catch(error) {
            handleError(error);
        }
    }
    
    async download_plan(workspace_id, plan_id, fname) {
        try {
            await this.dps.init("mp_config.json");
            const res = await this.dps.download_data_plan(workspace_id, plan_id);
            
            // write file to disk
            saveResponseToFile(res, fname, `Plan downloaded successfully to ${fname}`);
        } catch(error) {
            handleError(error);
        }
    }
    
    async update_plan(workspace_id, plan_id, fname) {
        try {
            await this.dps.init("mp_config.json");
            const res = await this.dps.update_data_plan(workspace_id, plan_id, fname);
            
            // write file to disk
            saveResponseToFile(res, fname, `Updated data plan ${plan_id}`);
        } catch(error) {
            handleError(error);
        }
    }
    
    async delete_plan(workspace_id, plan_id) {
        try {
            await this.dps.init("mp_config.json");
            await this.dps.delete_data_plan(workspace_id, plan_id);
            console.log(`Data plan ${plan_id} was deleted`);
        } catch(error) {
            handleError(error);
        }
    }
    
    async download_plan_version(workspace_id, plan_id, plan_version_id, fname) {
        try {
            await this.dps.init("mp_config.json");
            const res = await this.dps.download_data_plan_version(workspace_id, plan_id, plan_version_id);
            
            // write file to disk
            saveResponseToFile(res, fname, `Data plan version ${plan_id} v.${plan_version_id} was downloaded to ${fname}`);
        } catch(error) {
            handleError(error);
        }
    }
    
    async create_plan_version(workspace_id, plan_id, fname) {
        try {
            await this.dps.init("mp_config.json");
            const res = await this.dps.create_data_plan_version(workspace_id, plan_id, fname);
            console.log(`Version created: ${res.data["version"]}`);
        } catch(error) {
            handleError(error);
        }
    }
    
    async update_plan_version(workspace_id, plan_id, plan_version_id, fname) {
        try {
            await this.dps.init("mp_config.json");
            await this.dps.update_data_plan_version(workspace_id, plan_id, plan_version_id, fname);
            console.log(`Version ${plan_version_id} in plan ${plan_id} was updated`);
        } catch(error) {
            handleError(error);
        }
    }
    
    async delete_plan_version(workspace_id, plan_id, plan_version) {
        try {
            await this.dps.init("mp_config.json");
            await this.dps.delete_data_plan_version(workspace_id, plan_id, plan_version);
            console.log(`Version ${plan_version} in plan ${plan_id} was deleted`);
        } catch(error) {
            handleError(error);
        }
    }
    
    async validate_event_batch(workspace_id, dataplan_version_file, batch_file) {
        try {
            await this.dps.init("mp_config.json");
            const res = await this.dps.validate_batch(workspace_id, dataplan_version_file, batch_file);
            console.log('Validation results: ');
            console.dir(res.data, { depth: null });
        } catch(error) {
            handleError(error);
        }
    }
}