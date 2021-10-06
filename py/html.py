#!/usr/bin/env python
import os, gi
gi.require_version('Gtk', '3.0')
gi.require_version('WebKit2', '4.0')
from gi.repository import Gtk, WebKit2


win=Gtk.Window(title="PY EdB4")
win.set_icon_from_file("../launcher-icon-1x.png")
#win.set_titlebar("PY EdB4")
win.resize(360,640)
win.connect('destroy' , lambda w: Gtk.main_quit())

scroller = Gtk.ScrolledWindow()
win.add(scroller)

web=WebKit2.WebView()

path=os.getcwd()

web.load_uri('http://localhost/www/edb5/')
#web.load_uri('http://edbserv:9000#telef;')
#web.load_uri('https://www.enricofromrome.eu')
scroller.add(web)

win.show_all()

Gtk.main()


