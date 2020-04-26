import sirv from 'sirv';
import compression from 'compression';
import * as sapper from '@sapper/server';

import "./i18n.js";

const scout = require("@scout_apm/scout-apm");
const app = require('express')();

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

app
	.use(scout.expressMiddleware())
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
