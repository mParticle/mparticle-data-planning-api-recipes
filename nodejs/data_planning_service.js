'use strict';

const axios = require('axios');
const fs = require('fs');

module.exports = class DataPlanningService {
    platform_api_url = 'https://api.mparticle.com';
    mparticle_sso_token_endpoint = 'https://sso.auth.mparticle.com/oauth/token';

    init(config_json) {
        const config = JSON.parse(fs.readFileSync(config_json));

        this.platform_api_key = config['platform_api_key'];
        this.platform_api_secret = config['platform_api_secret'];

        const data_json = {
            "client_id": this.platform_api_key,
            "client_secret": this.platform_api_secret,
            "audience": this.platform_api_url,
            "grant_type": "client_credentials",
        };
        
        return axios
            .post(this.mparticle_sso_token_endpoint, data_json)
            .then(res => {
                axios.defaults.headers.common['Authorization'] = `Bearer ${res.data['access_token']}`;
            });
    }

    create_data_plan(workspace_id, fname) {
        const data_plan = JSON.parse(fs.readFileSync(fname));
        const url = `${this.platform_api_url}/platform/v2/workspaces/${workspace_id}/plans`;

        return axios.post(url, data_plan);
    }

    download_data_plans(workspace_id) {
        const url = `${this.platform_api_url}/platform/v2/workspaces/${workspace_id}/plans`;
        return axios.get(url);
    }
    
    download_data_plan(workspace_id, plan_id) {
        const url = `${this.platform_api_url}/platform/v2/workspaces/${workspace_id}/plans/${plan_id}`;
        return axios.get(url);
    }

    update_data_plan(workspace_id, plan_id, fname) {
        const data_plan = JSON.parse(fs.readFileSync(fname));
            
        const url = `${this.platform_api_url}/platform/v2/workspaces/${workspace_id}/plans/${plan_id}`;
        return axios.patch(url, data_plan);
    }
    
    delete_data_plan(workspace_id, plan_id) {         
        const url = `${this.platform_api_url}/platform/v2/workspaces/${workspace_id}/plans/${plan_id}`;
        return axios.delete(url);
    }
    
    download_data_plan_version(workspace_id, plan_id, plan_version) {
        const url = `${this.platform_api_url}/platform/v2/workspaces/${workspace_id}/plans/${plan_id}/versions/${plan_version}`;
        return axios.get(url);
    }

    create_data_plan_version(workspace_id, plan_id, fname) {
        const version = JSON.parse(fs.readFileSync(fname));

        const url = `${this.platform_api_url}/platform/v2/workspaces/${workspace_id}/plans/${plan_id}/versions`;
        return axios.post(url, version);
    }
    
    update_data_plan_version(workspace_id, plan_id, plan_version, fname) {
        const version = JSON.parse(fs.readFileSync(fname));

        const url = `${this.platform_api_url}/platform/v2/workspaces/${workspace_id}/plans/${plan_id}/versions/${plan_version}`;
        return axios.patch(url, version);
    }

    delete_data_plan_version(workspace_id, plan_id, plan_version) {
        const url = `${this.platform_api_url}/platform/v2/workspaces/${workspace_id}/plans/${plan_id}/versions/${plan_version}`;
        return axios.delete(url);
    }

    validate_batch(workspace_id, data_plan_file, batch_file) {
        const document = JSON.parse(fs.readFileSync(data_plan_file));
        const batch = JSON.parse(fs.readFileSync(batch_file));

        const payload = {
            "document": document["version_document"],
            "batch": batch,
        };

        const url = `${this.platform_api_url}/platform/v2/workspaces/${workspace_id}/plans/validate`;
        return axios.post(url, payload);
    }
}
