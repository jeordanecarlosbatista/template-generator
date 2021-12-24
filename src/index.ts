#!/usr/bin/env node

import { prompt, QuestionCollection } from 'inquirer';
import yargs from 'yargs';
import { createTemplate, createTemplateError, typeTemplate } from './create-template';
import { RecursiveCopyAdapter } from './recursive-copy-adapter';

export const cleanArchOption = 'Clean Architecture';
export const hexagonalArchOption = 'Hexagonal Architecture';
import { execSync } from 'child_process';
import { Spinner } from 'cli-spinner';

const argv = yargs(process.argv.slice(2)).usage('This is gecode')
    .options({
        'init': {
            description: 'Start setup new project',
            alias: 'i',
            type: 'boolean'
        }
    }).argv as any;

yargs.showHelp();
console.log('\n\n\n');

const questions: QuestionCollection = [
    {
        type: 'list',
        name: 'architecture',
        message: 'What project template would you like to use?',
        choices: [cleanArchOption, hexagonalArchOption]
    },
    {
        type: 'input',
        name: 'projectName',
        message: "New project name?",
    },
    {
        type: 'confirm',
        name: 'startWithGit',
        message: 'Do you want to start with Git?',
        default: false,
    },
    {
        type: 'confirm',
        name: 'installDependencies',
        message: 'Install dependencies?',
        default: false,
    }
];

if (argv['init']) {
    prompt(questions)
        .then(async answers => {
            const createTemplateResult = await createTemplate({ name: answers.projectName, template: getTemplate(answers.architecture) }, new RecursiveCopyAdapter())
            if (answers.installDependencies) {
                if (createTemplateResult === createTemplateError.PROJECT_ALREADY_EXIST) {
                    console.log('Project name already exist :(');
                    return;
                }
                if (createTemplateResult === createTemplateError.UNKNOWN_ERROR) {
                    console.log('Could not create project :(');
                    return;
                }

                var spinner = new Spinner('Creating project... %s');
                spinner.setSpinnerString('|/-\\');
                spinner.start();
                execSync("npm install " + createTemplateResult);
                spinner.stop();
                console.log('Project created on successfully!!! 🚀');

            }
            console.log('Project created on successfully!!! 🚀');
        });
}

function getTemplate(architecture: string) {
    let template;
    if (architecture === cleanArchOption) {
        template = typeTemplate.CLEAN_ARCH;
    }
    if (architecture === hexagonalArchOption) {
        template = typeTemplate.HEXA_ARCH;
    }
    return template;
}
