---
title: 			"Redux"
description: 	"State management container for Javascript applications"
proficiency:	4
identifier:		"home"
---

## What is it?
[Redux](https://redux.js.org/) is a state management container for Javascript applications. 

## How does it work?
Redux is a state management library that provides a single source of truth for web application data. It is used primarily with the [ReactJS](https://reactjs.org) Javascript library to manage data for components.

Maintaining a predictable state works as follows:
- key components (such as an item detail view or filter component) are wrapped inside connected components, which map the application state and actions to that component.
- actions are functions that update the application state in conjunction with a reducer.
- an action is called which dispatches an action type and payload that the reducer function then picks up on.
- the reducer is then responsible for updating the state.
- a connected component sets the properties for its child component which is then updated in real time.
