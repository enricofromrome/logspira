#!/usr/bin/python
from gi.repository import Gtk

class MyWindow(Gtk.Window):

    def __init__(self):
        Gtk.Window.__init__(self, title="Hello World")

        self.but1 = Gtk.Button(label="Click Here",xalign=1,yalign=1)

        self.but1.connect("clicked", self.on_but1_clicked)
        self.add(self.but1)
        print(dir(self.but1.props))
        self.resize(600,800)

    def on_but1_clicked(self, widget):
        print("Hello World")
	

win = MyWindow()
win.connect("delete-event", Gtk.main_quit)
win.show_all()
Gtk.main()
