#!/usr/bin/env python3
import urllib.request
import json
import ssl
import os

# Disable SSL verification for MHLW site
ssl._create_default_https_context = ssl._create_unverified_context

# Download the Excel file
MHLW_URL = "https://www.mhlw.go.jp/content/11120000/001646581.xlsx"
OUTPUT_DIR = "public/data"

os.makedirs(OUTPUT_DIR, exist_ok=True)

print("Downloading pharmacy list from MHLW...")
xlsx_path = f"{OUTPUT_DIR}/mhlw_pharmacies.xlsx"

try:
    urllib.request.urlretrieve(MHLW_URL, xlsx_path)
    print(f"Downloaded to {xlsx_path}")
    print("Note: Need openpyxl to convert to JSON")
except Exception as e:
    print(f"Error: {e}")
