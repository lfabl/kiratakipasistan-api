import GraphHTTP from 'express-graphql';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { graphqlUploadExpress } from 'graphql-upload';
import appSchema from './source/graphql/schema';
import { json } from 'express';

//Constants
import { TOKEN_SECRET_KEY } from './source/constants';
import jwtVerify from "./source/constants/jwtVerify";

//Auth Folder
import signup from "./source/auth/signup/signup";
import signin from "./source/auth/signin/signin";
import forgetPassword from "./source/auth/forgetPassword";
import resetPasswordControl from "./source/auth/resetPasswordControl";
import userTokenControl from "./source/auth/userTokenControl";

const port = process.env.PORT || 4010;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/app', async (request, response, next) => {
	await jwtVerify(request).then((res) => {
		request.data = {
			userID: res.userID
		}
		next();
	}).catch((res) => {
		response.send({
			message: res.message,
			code: res.code
		})
	})
},
	graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 50 }),
	GraphHTTP((request, response, graphQLParams) => ({
		schema: appSchema,
		context: request.data,
		graphiql: true
	}))
);

app.use('/auth/signup', async (req, res, next) => {
	const createNewUser = await signup(req.body);
	res.send({
		message: createNewUser.message,
		code: createNewUser.code,
		token: createNewUser.token
	})
});


app.use('/auth/signin', async (req, res, next) => {
	const createNewUser = await signin(req.body);
	res.send({
		message: createNewUser.message,
		code: createNewUser.code,
		token: createNewUser.token
	})
});

app.use('/auth/forgetPassword', async (req, res, next) => {
	const forgetPasswordResult = await forgetPassword(req.body);
	res.send({
		message: forgetPasswordResult.message,
		code: forgetPasswordResult.code
	})
});

app.use('/auth/resetPassword', express.static(__dirname + '/source/auth/resetPassword'));

app.use('/auth/resetPasswordControl', async (req, res, next) => {
	const forgetPasswordResult = await resetPasswordControl(req.body);
	res.send({
		message: forgetPasswordResult.message,
		code: forgetPasswordResult.code
	})
});


app.use('/auth/userTokenControl', async (req, res, next) => {
	const createNewUser = await userTokenControl(req.body);
	res.send({
		message: createNewUser.message,
		code: createNewUser.code,
		userID: createNewUser.userID
	})
});
app.use('/profileImages', express.static(__dirname + '/source/uploadedProfileImages'));

app.listen(port, async () => {
	//createSecretToken(await r.uuid());
	console.log('Server start on localhost:' + port);
});