#!/bin/sh
cd ..
python3 -m http.server 9000 &
cd py
python3 html.py

