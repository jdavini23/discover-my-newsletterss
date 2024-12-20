const { execSync } = require('child_process');
const os = require('os');

function runCommitScript() {
  const platform = os.platform();
  let scriptPath;

  switch (platform) {
    case 'win32':
      scriptPath = './commit.ps1';
      execSync(`powershell.exe -File "${scriptPath}"`, { stdio: 'inherit' });
      break;
    case 'darwin':
    case 'linux':
      scriptPath = './commit.sh';
      execSync(`bash "${scriptPath}"`, { stdio: 'inherit' });
      break;
    default:
      throw new Error(`Unsupported platform: ${platform}`);
  }
}

runCommitScript();
