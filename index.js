const core = require('@actions/core');
const SSH2Shell = require("ssh2shell");

try {

  // SSHコマンド取得
  const commands = core.getInput('commands');

  // 複数行ある場合、配列に
  let items = commands.split("\n");

  const host = {
      server: {
          host: core.getInput('host'),
          userName: core.getInput('username'),
          password: core.getInput('password')
      },
      commands: items,
  }

  // SSHクライアントの作成
  const SSH = new SSH2Shell(host);
  
  // 接続
  SSH.connect(function(sessionText){
      /* Response text */
      console.log(sessionText);
  });

} catch (error) {
  core.setFailed(error.message);
}