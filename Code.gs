function getEmails() {
  var label = GmailApp.getUserLabelByName("My Label");
  var threads = label.getThreads();
  for (var i = 0; i < threads.length; i++) {
    var messages=threads[i].getMessages();
    for (var m=0; m < messages.length; m++) {   
      var folders = DriveApp.getFoldersByName("OutputFolder");
      if (folders.hasNext()) {
        var folder = folders.next();
        saveData(folder, "testfile.xlsx", messages[m].getBody());
      }
    }
  }
}

function saveData(folder, filename, contents) {
  var children = folder.getFilesByName(filename);
  var file = null;
  if (children.hasNext()) {
    file = children.next();
    file.setContent(contents);
  } else {
    file = folder.createFile(filename, contents);
  }
}