# Bandmatch to do add little icon

## Introduction

The Bandmatch app gives musicians, bands and venue owners a one stop shop so they can focus on creating and showcasing amazing music.

Bandmatch gives all music creators from budding musicians to experienced something the opportunity to create their own profile to increase exposure, the ability create bands with friends or other users, to collaborate with other bands on musicians to create the perfect sound and then to showcase it all by booking an upcoming gig posted by our venue owners.

Keep reading to find out more about our application.

## Table of Contents

- [Bandmatch to do add little icon](#bandmatch-to-do-add-little-icon)
  - [Introduction](#introduction)
  - [Table of Contents](#table-of-contents)
  - [Project Link](#project-link)
  - [Getting Started](#getting-started)
    - [Installation](#installation)
    - [Launch the app](#launch-the-app)
  - [About the Project](#about-the-project)
    - [Description](#description)
    - [User Stories](#user-stories)
      - [Musician User](#musician-user)
      - [Venue Owner User](#venue-owner-user)
    - [Figma](#figma)
      - [Figma Screenshots](#figma-screenshots)
    - [React StoryBook](#react-storybook)
    - [Technologies Used](#technologies-used)
    - [Future Improvements](#future-improvements)
      - [Service Provider User:](#service-provider-user)
      - [Favourite/Friend](#favouritefriend)
      - [Update Chat](#update-chat)
    - [Screenshots](#screenshots)
  - [Contact the Team](#contact-the-team)

## Project Link

To view the project on Heroku [click here](https://arcane-springs-60231.herokuapp.com/profile/61294e37c9ca2400223e4fdf).

## Getting Started

To run the application you will first need to clone both the client and server repositories.

To access the server repository [click here](https://github.com/ivnkris/bandmatch-server) and follow the steps to get started with the server.

### Installation

```
git clone git@github.com:ivnkris/bandmatch-client.git
cd bandmatch-client
npm i
```

You will also need to add your .env following the variables in the .env.EXAMPLE file.

to do add example .env file

### Launch the app

```
npm run start
```

## About the Project

### Description

Bandmatch is not mern what do we call it?

Our app has three main features?
musician users can make an account, create a band, find members to join their bands or join other bands, collaborate with other users, find and request gigs to play at.

on your profile page

go on the assemble page and see carousel of newest musicians and bands click on the card to see a snippet and play their soundcloud link, click to view their full profile or send a message

go on the collaborate page

go on the gig page

### User Stories

#### Musician User

to do - how to make it scroll

```
As a musician user I can create a profile setting my experience level, played instruments and genre. I can also specify if I'm open to join a band or collaborate with other musicians.

As a musician user, I can see other musicians who would like to "Assemble" a band, I can filter based on my preferences, view their profile, listen to some of their work and message them to learn more about them.

As a musician user, I can see other musicians who are open to "Collaborate", so that if I have a specific musical idea I can find the right people to make it happen.

As a musician user, I can create a band, specifying the instrument we are looking for to complete the band and show all the members already in the band.

As a musician user, I can see upcoming "Gigs" in nearby venues and can apply to play at them.
```

#### Venue Owner User

```
As a venue owner, I can create a venue account with some information about my venue and I can see the musicians, bands and gigs on the website.

As a venue user, I can create a gig and add some information, including date, time, genre and remuneration for musicians. Musicians and bands can then apply to play at my gigs and I can approve or reject them.
```

### Figma

We used Figma as it allowed us to plan and collaborate on our designs together in real time to produce high fidelity designs. That allowed us to easily spot what we wanted to make into react components and to consistency build our entire site.

#### Figma Screenshots

### React StoryBook

to do - do we want to mention this

### Technologies Used

This project was build using

react - build reusable components - useful for our difficult/complex components like modals, use of state for those components, having a ton of libraries.

graphql - query data - doesn't expose data you don't want exposed but also gets back a lot resources in one query.

mongodb - our data doesn't have a lot of relations

Other technologies and packages:

- react-bootstrap
- chroma-js
- jquery
- moment
- uuid

to do - do i add react packages

### Future Improvements

#### Service Provider User:

To be a one stop shop for musicians we would like to add more services that musicians and bands may need. One such feature that we had to cut was service providers who could allow musicians to rent all they could need to create the next great hit from equipment to studio spaces.

#### Favourite/Friend

To improve user experience we could add a feature for users to save other users

#### Update Chat

Currently our application is using graphQL polling to mimic real time conversations. To improve scalability and to add realtime notifications.

### Screenshots

## Contact the Team

- Dominika: [Github](https://github.com/dominikacookies),
  [LinkedIn](https://www.linkedin.com/in/dominika-pietrzak-183755137/)
- Kris: [Github](https://github.com/ivnkris), [LinkedIn](https://www.linkedin.com/in/krisztian-ivan-10880478//)
- Natasha: [Github](https://github.com/natasha-mann), [LinkedIn](https://www.linkedin.com/in/natashamann2896//)
- Soumeya: [Github](https://github.com/SoumeyaH), [LinkedIn](https://www.linkedin.com/in/soumeya-hassan-0a12a5203/)
