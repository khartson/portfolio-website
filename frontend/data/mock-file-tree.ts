import { FileTreeEntry } from '../types/portfolio';
import { Folder, ScrollText, FileCode, FileText } from 'lucide-react';
// Import devicons for language-specific file icons (VS Code style)
import PythonOriginal from 'devicons-react/icons/PythonOriginal';
import GoOriginalWordmark from 'devicons-react/icons/GoOriginalWordmark';
import PythonOriginalWordmark from 'devicons-react/icons/PythonOriginalWordmark';


const mockFileTree: FileTreeEntry[] = [
  // --- README.md (Root Level) ---
  {
    id: 'readme',
    name: 'README.md',
    type: 'file',
    icon: FileText,
    language: 'markdown',
    path: '/README.md',
    content: `# Kyle's Portfolio (WIP)

This site is currently a **work in progress** and is being built to showcase my projects in an interactive code editor format.

---

## Status

More content is coming soon! Please check back later for my complete project details and technical write-ups.

In the meantime, feel free to check out my resume in the \`/docs\` folder.`,
  },
  // --- DOCS FOLDER ---
  {
    id: 'docs',
    name: 'docs',
    type: 'folder',
    icon: Folder,
    language: 'default',
    content: '',
    children: [
      {
        id: 'docs-resume',
        name: 'resume.pdf',
        type: 'file',
        icon: ScrollText,
        language: 'pdf',
        path: '/docs/resume.pdf',
        content: '/Resume_November_2025.pdf',
      },
    ],
  },
  // --- PROJECTS FOLDER (Code Demonstration) ---
  {
    id: 'projects',
    name: 'projects',
    type: 'folder',
    icon: Folder,
    language: 'default',
    content: '',
    children: [
      {
        id: 'projects-go-server',
        name: 'go-server',
        type: 'folder',
        icon: Folder,
        language: 'default',
        content: '',
        children: [
          {
            id: 'projects-go-server-main',
            name: 'main.go',
            type: 'file',
            icon: GoOriginalWordmark,
            language: 'go',
            path: '/projects/go-server/main.go',
            content: `package main

import "fmt"

// main is the entry point of the Go application
func main() {
	// This is a simulated code snippet.
	message := "Hello from the Go backend!"
	fmt.Println(message)
	
	// TODO: Implement file serving logic
	if len(message) > 0 {
		// Logging a successful initialization
		fmt.Println("Server initialized successfully.")
	}
}
`,
          },
        ],
      },
      {
        id: 'projects-python',
        name: 'python',
        type: 'folder',
        icon: Folder,
        language: 'default',
        content: '',
        children: [
          {
            id: 'projects-python-experience',
            name: 'experience.py',
            type: 'file',
            icon: PythonOriginal,
            language: 'python',
            path: '/projects/python/experience.py',
            content: `import pandas as pd
import logging
import requests

from fastapi import FastAPI, Request
from fastapi.responses import RedirectResponse
from bs4 import BeautifulSoup
from simple_salesforce import Salesforce 
from quickbooks import QuickBooks
from pydantic import BaseModel
import datetime 

from .projects import DiscordMarkovBot
from .projects import ipynb

YEARS_OF_EXPERIENCE = 4

class UseCases: 
    def __init__(self):
        self.app = FastAPI()
        self.sf  = Salesforce()
        self.logger = logging.getLogger("__name__")
    
    def data_pipelines(self, local_data_csv: str = 'data/input.csv'):
        """
        Produced a variety of server-to-server data pipelines at Propela Tech, integrating disparate services
        for workflow automation or data insights solutions 
        Showcases: FastAPI, QuickBooks, Salesforce 
        """
        self.logger(f"Running data transformation job on {local_data_csv}...")
        # 1) Extract, load 
        sf_data = self.sf.query_all("SELECT Id, External_Id__c, Status__c FROM Lead")  
        df_sf = pd.DataFrame(sf_data["records"]).rename(columns={'External__Id__c': "external_id"})
        df_local = pd.read_csv(local_data_csv)
        
        # 2) Transform: identify differences
        df_merged = pd.merge(df_sf, df_local[['external_id', "new_status"]], on="external_id", how="left")
        # filter 
        df_updates = df_merged[
            (df_merged["Status__c"] != df_merged["new_status"]) & (df_merged["new_status"].notna())
        ]
        
        # 3) Load: prepare, execute bulk update 
        update_payload = df_updates[["Id", "new_status"]].rename(columns={'new_status': "Status__c"}).to_dict('records')
        self.sf.bulk.Lead.update(update_payload)
        return len(update_payload)

    def document_api_integration(self, api_url: str):
        """
        Handles critical automation tasks involving complex document parsing (PDFs) and 
        external API integration (requests, parsing JSON/XML)
        Showcases: ActionStep/EDEX APIs
        """
        self.logger("Starting Document and API Automation Task...")
        try:
            response = requests.get(api_url, timeout=5)
            response.raise_for_status()
            api_data = response.json() 
            self.logger(f"Success. Received status: {api_data.get('system_status', 'N/A')}")
            for item in api_data.get("records", []): 
                pl = transform_to_filing_payload(item)
                res = requests.post(DATA_SERVICE_URL, json=pl)
        except requests.exceptions.HttpError as e:
            self.logger(f"HTTP Error: {e}")
            return process_alert()
        except Exception as e: 
            self.logger(f"Other error occurred: {e}")
            return process_alert(type=process_errors.OTHER)
    
    async def web_api_development(self): 
        """
        Experienced with FastAPI and Django for a variety of web development/api integrations tasks 
        Showcases: OAuth and token management systems, event-driven architecture
        """
        app = FastAPI()

        @app.get("/login")
        async def login(request: Request):
            auth_params = {
                "response_type": "code",
                "client_id": CLIENT_ID,
                "redirect_uri": REDIRECT_URI,
                "scope": "SCOPE"
            }
            query_string = build_query_string(auth_params)
            return RedirectResponse(f"{AUTHORIZATION_URL}?{query_string}")

        @app.get("/callback")
        async def callback(request: Request): 
            """
            Handles callback from OAuth provider and request to token server to authenticate and authorize
            """
            pass
`,
          },
        ],
      },
    ],
  },
];

export default mockFileTree;