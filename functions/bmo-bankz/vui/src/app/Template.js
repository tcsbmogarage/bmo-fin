'use strict'
const path = require('path');
const pug = require('pug-ssml');
const CachePugTemplates = require('cache-pug-templates');
const fs = require('fs')

const Template = {
     speechFileSuffix: "-ssml.js",
     rootPath: "speech",
     templatePath: "speech/templates",
     BasePath: "./",
     Cache: {},
     Engine: {},
     Map: {},
     GetAll(){
        return pug.cache;
     },
     StartCache(locales){
        let speech = path.join(__dirname, '../speech/templates/en-ca');
        this.Cache = new CachePugTemplates({speech});
        console.log(this.Cache);
        this.Cache.start();
     },
     Initialize(locale){
        let custom = {};
        custom["help"] = this.Engine["help"];
        custom[locale] = this.Engine[locale];
        return custom;
     },
     Load(locale){
        let obj = {};
        this.rootPath = this.BasePath + '/speech';
        this.templatePath = this.rootPath + '/templates';
        let speechFile = `${locale}${this.speechFileSuffix}`;
        let speechFilePath = path.join(this.rootPath, speechFile);
        let localePath = path.join(this.templatePath, locale);
        try {
            if (!fs.existsSync(speechFilePath)) {
                pug.precompile(localePath, {
                    basedir: `./speech/templates`,
                    output: this.rootPath,
                    file: speechFile,
                    pretty: false
                })
            }
        } catch(err) {
            console.error(err)
        }
        obj = require(speechFilePath);
        this.Map[locale] = this.templatePath; 
        this.Engine[locale] = obj;
        return obj;
    }
};

module.exports = Template;