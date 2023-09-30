<template>
  <h1>
    MEVN Library
  </h1>
  This project is an example project representing a personal library using the MEVN stack to create a CRUD capable SPA with a RESTful API. So you can add your media, search through your library, update and remove titles as well as track if you've read or listened to the media and add whatever notes you may like.
  The library is a Vue 3 SPA that uses Vue + Vue Router + Vite + Axios for the front end, an Express + Node + Mongoose server, and Mongodb for the database.

  - How to use basics

  At the top there is a navigation bar that has some quick links to your entire media library. This queries the database and populates it with the media you have. There are similar links that will only display the named format, like Hardcovers or Ebooks.
  Media can be added to the library with the "Add Media" link on the nav bar. Author, Title and format are all required while the other fields are optional and any field can be updated later.

  Any of the media titles can be edited from any list in which they appear. On the left side the title will populate, and by clicking a title the details will appear on the right side of the screen. There are update and delete buttons along with the details. 
  Delete has no confirmation and removes the media from the library. Update will open up a form containing that media's details and you can change them however you like, then submit the changes to the library database to save the changes.

  - Notes

  * There is no authentication or authorization here. Any media added is public and anyone can change anything since this is just an example project. Additionally, the database will purge itself periodically or when it gets too full.
  * The frontend talks to the backend via an agnostic RESTful API.
</template>
