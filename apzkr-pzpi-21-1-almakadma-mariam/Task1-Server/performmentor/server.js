const { express, router, pool } = require('./configuration/commonConfig');
const bodyParser = require('body-parser');
const companyRoutes = require('./routers/companyRouter');

const  departmentRoutes = require('./routers/departmentRouter');
const  userRoutes = require('./routers/userRouter');

const taskRoutes = require('./routers/taskRouter');
const taskExecutorRoutes = require('./routers/taskExecutorRouter');
const commentRoutes = require('./routers/commentRouter');
const workHoursSettingsRouter = require('./routers/workHoursSettingsRouter');
const workHoursRouter = require('./routers/workHoursRouter');
const achievementRouter = require('./routers/achievementRouter');
const rewardRouter = require('./routers/rewardRouter');
const usersRewardRouter = require('./routers/usersRewardRouter');

const reportRouter = require('./routers/reportRouter');
const cors = require('cors');
const backupRouter = require('./routers/backupRouter');
const app = express();

app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


// Middleware
app.use(bodyParser.json());
app.use('/backup', backupRouter);
// Routes
app.use('/company', companyRoutes);

app.use('/department', departmentRoutes);
app.use('/users', userRoutes);

app.use('/task', taskRoutes);
app.use('/taskExecutor', taskExecutorRoutes);
app.use('/comment', commentRoutes);
app.use('/wHS', workHoursSettingsRouter);
app.use('/workH', workHoursRouter);
app.use('/achievements', achievementRouter);
app.use('/reward', rewardRouter);
app.use('/users-reward', usersRewardRouter);


app.use('/report', reportRouter);

// Call initializeAssociations function after initializing Sequelize
const initializeAssociations = require('./models/association');
initializeAssociations();

const PORT = 3500;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
