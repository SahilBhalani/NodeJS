//* OS Module
const os = require('os');

// Basic system information
console.log(`OS Platform: ${os.platform()}`);
console.log(`OS Type: ${os.type()}`);
console.log(`OS Release: ${os.release()}`);
console.log(`CPU Archietecture: ${os.arch()}`);
console.log(`Hostname: ${os.hostname()}`);

//Memory Information
const totalMemGB = (os.totalmem() / (1024 * 1024 * 1024)).toFixed(2);
const freeMemGB = (os.freemem() / (1024 * 1024 * 1024)).toFixed(2);
console.log(`Memory: ${freeMemGB}GB free of ${totalMemGB}GB`);

//User information
const userInfo = os.userInfo();
console.log(`Current User: ${userInfo.username}`);
console.log(`Home Directory: ${os.homedir()}`);

//! ------------------------------------------------------------------

//* os.arch()
// Returns the operating system CPU archietecture for which the Node.js binary was compiled

//Get CPU Architecture
console.log(`CPU Architecture: ${os.arch()}`);

//* os.platform()
//Returns the string identifying the operating system platform
console.log(`Platform: ${os.platform()}`);

//* os.type()
//Return the operatiing system name as returned by uname on POSIX systmes, ir from the ver command on windows
console.log(`OS Type: ${os.type()}`);

//* os.release()
//Returns the operating system release number.
console.log(`OS Release: ${os.release()}`);

//* os.version()
//Retunrs the string identifying the kernal version. On WIndows, this includes build information
console.log(`Kernel Version: ${os.version()}`);

//!-------------------------------------------------------------------

//* User and Environment

//* os.userInfo()
//Returns information about the currently effective user.
const user = os.userInfo();
console.log('User Information:');
console.log(`- Username: ${user.username}`);
console.log(`- User ID: ${user.id}`);
console.log(`- Group ID: ${user.gid}`);
console.log(`- Home Directory: ${user.homedir}`);

//on windows, you can also get the user's domain
if(os.platform() === 'win32'){
    console.log(`- Domain: ${user.domain || 'N/A'}`);
}

//* os.homedir()
//Returns the home directory of the current user.

const path = require('path');
const { clearLine } = require('readline');

//get the home directory
const homeDir = os.homedir();
console.log(`Home Directory: ${homeDir}`);

//Ex. Create a path to config file in the user's home directory
const configPath = path.join(homeDir, '.myapp', 'config.json');
console.log(`Config file will be saved to: ${configPath}`);

//* os.hostname()
//Returns the hostname of the operating system.

//get the system hostname
const hostname =os.hostname();
console.log(`Hostname: ${hostname}`);

//Ex. Use hostname in logging or configuration
console.log(`Server started on ${hostname} at ${new Date().toISOString()}`);

//* os.tmpdir()
//Returns the operating system's default directory for temparory files.
console.log(`Temporary Directory: ${os.tmpdir()}`);

//!-------------------------------------------------------------------

//* os.cpus()
//Returns an array of objects containing information about each logical CPU core.

// get CPU information
const cpus = os.cpus();
console.log(`Number of CPU Cores: ${cpus.length}`);

//Display information about each CPU core
cpus.forEach((cpu, index) => {
    console.log(`\nCPU Core ${index + 1}`);
    console.log(`- Model: ${cpu.model}`);
    console.log(`- Speed: ${cpu.speed} MHz`);
    console.log(`- Times (ms):`, { user: cpu.times.user,
        nice: cpu.times.nice,
        sys: cpu.times.sys,
        idle: cpu.times.idle,
        irq: cpu.times.irq
    });
});

//Calculate total CPU usage (example: requires two measurements)
function calculateCpuUsage(prevCpus){
    const currentCpus = os.cpus();
    const usage = [];

    for (let i = 0; i < currentCpus.length; i++) {
        const current = currentCpus[i];
        const prev = prevCpus ? prevCpus[i] : { times : {user : 0, nice: 0, sys: 0, idle: 0, irq : 0}};

        const prevIdle = prev.times.idle;
        const idle = current.times.idle - prevIdle;

        let total = 0;
        for (const type in current.times) {
            total += current.times[type] - (prev.times[type] || 0);
        }

        const usagePercent = ((1- idle / total) * 100).toFixed(1);
        usage.push(parseFloat(usagePercent));
    }

    return {
        prevCore: usage,
        average: (usage.reduce((a,b) => a + b,0) / usage.length).toFixed(1),
        cpus : currentCpus
    };
}

//Example usage of CPU usage calculation
console.log('\nCPU Usage (requires two measurements):');
const firstMeasure = os.cpus();

//Simulate some CPU work
for(let i = 0; i < 1000000000; i++){}
const usage = calculateCpuUsage(firstMeasure);
console.log(`Average CPU Usage: ${usage.average}%`);


//!-------------------------------------------------------------------

//* Practical Examples

//TODO: System Information Daashboard
//This example creates a comprehensive system information report:

function getSystemInfo() {
    const info = {
        os: {
            type: os.type(),
            platform: os.platform(),
            architecture: os.arch(),
            release: os.release(),
            hostname: os.hostname(),
            uptime: formatUptime(os.uptime())
        }, 

        user:{
            username: os.userInfo().username,
            homedir: os.homedir(),
            tempdir: os.tmpdir()
        }, 
        memory: {
            total: formatBytes(os.totalmem()),
            free: formatBytes(os.freemem()),
            usage: `${((1 - os.freemem() / os.totalmem()) * 100).toFixed(2)}%`
        }, 
        cpu : {
            model: os.cpus()[0].model,
            cores: os.cpus().length,
            speed: `${os.cpus()[0].speed} MHz`
        }
    };

    return info;
}

function formatUptime(seconds){
    const days = Math.floor(seconds / (60 * 60 * 24));
    const hours = Math.floor((seconds % (60* 60 * 24)) / (60*60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);
    const secs = Math.floor(seconds % 60);

    return `${days}d ${hours}h ${minutes}m ${secs}s`;
}

function formatBytes(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Bytes';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
}

//Display the system information dashboard
const systemInfo = getSystemInfo();
console.log('======= SYSTEM INFORMATION DASHBOARD =======');
console.log(JSON.stringify(systemInfo, null, 2));

//Display in a more formatted way
console.log('\n======= FORMATTED STYSTEM INFORMATION =======');
console.log(`OS: ${systemInfo.os.type} (${systemInfo.os.platform} ${systemInfo.os.architecture})`);
console.log(`Version: ${systemInfo.os.release}`);
console.log(`Hostname: ${systemInfo.os.release}`);
console.log(`Uptime: ${systemInfo.os.uptime}`);
console.log(`User: ${systemInfo.user.username}`);
console.log(`Home Directory: ${systemInfo.user.homedir}`);
console.log(`CPU: ${systemInfo.cpu.model}`);
console.log(`Cores: ${systemInfo.cpu.cores}`);
console.log(`Speed: ${systemInfo.cpu.speed}`);
console.log(`Memory Total: ${systemInfo.memory.total}`);
console.log(`Memory Free: ${systemInfo.memory.free}`);
console.log(`Memory Usage: ${systemInfo.memory.usage}`);


//TODO: Resource Monitor
//This example create a basic resource monitor that updates every second
function monitorResources(){
    console.clear();

    const now = new Date().toLocaleTimeString();
    console.log(`======== RESOURCE MONITOR (${now}) =======`);

    //cpu usage
    const cpus = os.cpus()
    console.log(`\nCPU Cores: ${cpus.length}`);

    //Calculate CPU usage (This is approximate since we need two measurements)
    const cpuUsage = cpus.map((cpu, index) => {
        const total = Object.values(cpu.times).reduce((acc, tv) => acc + tv, 0)
        const idle = cpu.times.idle;
        const usage = ((total - total - idle) / total * 100).toFixed(1);
        return `Core ${index}: ${usage}% used`;
    });

    console.log(cpuUsage.join('\n'));

    //Memory Usage
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;

    console.log('\nMemory Usage:');
    console.log(`Total: ${formatBytes(totalMem)}`);
    console.log(`Used: ${formatBytes(usedMem)} (${(usedMem / totalMem* 100).toFixed(1)}%)`);
    console.log(`Free: ${formatBytes(freeMem)} (${(freeMem / totalMem * 100).toFixed(1)}%)`);

    //System Uptime
    console.log(`\nSystem Uptime: ${formatUptime(os.uptime())}`);

    //Process info
    console.log('\nProcess Information:');
    console.log(`PID: ${process.pid}`);
    console.log(`Memory Usage: ${formatBytes(process.memoryUsage().rss)}`);
    console.log(`User: ${os.userInfo().username}`);
}


///Initial display
monitorResources();

//Update every second (note: in a real application, you might not want to update this frequently as it uses CPU resources)
const intervalId = setInterval(monitorResources,1000);

//For this example, we'll run 10 seconds then stop
console.log('Monitor will run for 10 seconds...');
setTimeout(() => {
    clearInterval(intervalId);
    console.log('\nResource Monitoring stopped');
}, 10000)
