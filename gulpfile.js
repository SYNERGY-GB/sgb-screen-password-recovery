'use strict';

var megazord = require ('megazord-sdk');
var gulp = require('gulp');

gulp.tasks = megazord.gulp.tasks; 
megazord.registerScreenTasks(); 