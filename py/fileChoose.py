#!/usr/bin/env python
import pygtk
pygtk.require('2.0')
import gtk

dialog = gtk.FileChooserDialog("Scegli uno o piu' file(s)",
                               None,
                               gtk.FILE_CHOOSER_ACTION_OPEN,
                               (gtk.STOCK_CANCEL, gtk.RESPONSE_CANCEL,
                                gtk.STOCK_OPEN, gtk.RESPONSE_OK))

dialog.set_default_response(gtk.RESPONSE_OK)
dialog.set_select_multiple(1)
response = dialog.run()
if response == gtk.RESPONSE_OK:
    print dialog.get_filenames()

dialog.destroy()
