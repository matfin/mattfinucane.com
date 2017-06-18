---
title: 			"Shelfd Prototype"
description:	"Prototype iOS app for Shelfd."
synopsis:		"This is a prototype iOS app for the Shelfd media aggregation tool."
date:			"2015-04-01"
duration:		"40 days"
identifier:		"projects"
languages: 		
- Objective C
frameworks:
- CoreData
tools:
- Adobe Photoshop
- Font Awesome
- Git
- XCode
---

## The brief
I was given the task of creating a prototype for the Shelfd iOS application which aggregates a users monthly media consumption into one place.

The task was to create a simple application that would connect to a users media library across different services and sync them to their iOS device. 

This media would then be played back on the users TV.

## Project planning and development
The project setup was as follows:

- Objective C would be the language of choice given the wider availabilty of third party libraries.
- External dependencies would be managed using [Cocoapods](https://cocoapods.org/).
- Authorisation keys for third party services would be stored using Secure Keychain on the device.
- AutoLayout would be used to automatically resize UI components. This was coded by hand.
- Downloaded media information was stored using CoreData.
- Icon fonts were generated on [IcoMoon](https://icomoon.io/) and included in the project.

## Beta release cycle
The weekly release cycle for this prototype was handled using iTunes Connect.
