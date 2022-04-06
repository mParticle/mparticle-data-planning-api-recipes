import mparticle
import json
import pdb
import requests
import sys

from mparticle import *
from time import sleep, time


class DataPlanningService:
    platform_api_url = 'https://api.mparticle.com'
    mparticle_sso_token_endpoint = 'https://sso.auth.mparticle.com/oauth/token'

    def __init__(self, config_json):
        with open(config_json) as f:
            config = json.load(f)

        self.platform_api_key = config['platform_api_key']
        self.platform_api_secret = config['platform_api_secret']

        data_json = {
            "client_id": self.platform_api_key,
            "client_secret": self.platform_api_secret,
            "audience": self.platform_api_url,
            "grant_type": "client_credentials"
        }
        
        oauth_response = requests.post(self.mparticle_sso_token_endpoint, data=data_json)
        if oauth_response.status_code != 200:
            print(f'Authentication request returned {oauth_response.status_code}')
            sys.exit(1)
    
        oauth_response_json = json.loads(oauth_response.text)
        self.headers = {'Authorization': 'Bearer ' + oauth_response_json['access_token']}

    def create_data_plan(self, workspace_id, fname):
        with open(fname) as f:
            data_plan = json.load(f)
        path = '/platform/v2/workspaces/%d/plans' % (workspace_id)
        url = self.platform_api_url + path
        response = requests.post(url, json=data_plan, headers=self.headers)
        if (response.status_code > 200):
            print(response.json())
        response.raise_for_status()
        plan = response.json()
        return plan

    def download_data_plans(self, workspace_id):
        path = '/platform/v2/workspaces/%d/plans' % (workspace_id)
        url = self.platform_api_url + path
        response = requests.get(url, headers=self.headers)
        if (response.status_code > 200):
            print(response.json())
        response.raise_for_status()
        plans = response.json()
        return plans
    
    def download_data_plan(self, workspace_id, plan_id):
        path = '/platform/v2/workspaces/%d/plans/%s' % (workspace_id, plan_id)
        url = self.platform_api_url + path
        response = requests.get(url, headers=self.headers)
        if (response.status_code > 200):
            print(response.json())
        response.raise_for_status()
        plan_version = response.json()
        return plan_version

    def update_data_plan(self, workspace_id, plan_id, fname):
        with open(fname) as f:
            data_plan = json.load(f)
            
        path = '/platform/v2/workspaces/%d/plans/%s' % (workspace_id, plan_id)
        url = self.platform_api_url + path
        response = requests.patch(url, headers=self.headers, json=data_plan)
        if (response.status_code > 200):
            print(response.json())
        response.raise_for_status()
        plan = response.json()
        return plan
    
    def delete_data_plan(self, workspace_id, plan_id):            
        path = '/platform/v2/workspaces/%d/plans/%s' % (workspace_id, plan_id)
        url = self.platform_api_url + path
        response = requests.delete(url, headers=self.headers)
        if (response.status_code > 204):
            print(response.json())
        response.raise_for_status()
    
    def download_data_plan_version(self, workspace_id, plan_id, plan_version):
        path = '/platform/v2/workspaces/%d/plans/%s/versions/%s' % (workspace_id, plan_id, plan_version)
        url = self.platform_api_url + path
        response = requests.get(url, headers=self.headers)
        if (response.status_code > 200):
            print(response.json())
        response.raise_for_status()
        plan_version = response.json()
        return plan_version

    def create_data_plan_version(self, workspace_id, plan_id, fname):
        with open(fname) as f:
            version = json.load(f)

        path = '/platform/v2/workspaces/%d/plans/%s/versions' % (workspace_id, plan_id)
        url = self.platform_api_url + path
        response = requests.post(url, headers=self.headers, json=version)
        if (response.status_code > 200):
            print(response.json())
        response.raise_for_status()
        plan_version = response.json()
        return plan_version
    
    def update_data_plan_version(self, workspace_id, plan_id, plan_version, fname):
        with open(fname) as f:
            version = json.load(f)

        path = '/platform/v2/workspaces/%d/plans/%s/versions/%s' % (workspace_id, plan_id, plan_version)
        url = self.platform_api_url + path
        response = requests.patch(url, headers=self.headers, json=version)
        responseJson = response.json()
        if (response.status_code > 200):
            print(responseJson)
        response.raise_for_status()
        return responseJson

    def delete_data_plan_version(self, workspace_id, plan_id, plan_version):
        path = '/platform/v2/workspaces/%d/plans/%s/versions/%s' % (workspace_id, plan_id, plan_version)
        url = self.platform_api_url + path
        response = requests.delete(url, headers=self.headers)
        if (response.status_code > 204):
            print(response.json())
        response.raise_for_status()
    
    def get_latest_plan_version(self, workspace_id, plan_id):
        path = '/platform/v2/workspaces/%d/plans/%s' % (workspace_id, plan_id)
        url = self.platform_api_url + path
        response = requests.get(url, headers=self.headers)
        if (response.status_code > 200):
            print(response.json())
        response.raise_for_status()
        plan_versions = response.json()
        return max([plan_version['version'] for plan_version in plan_versions['data_plan_versions']])
