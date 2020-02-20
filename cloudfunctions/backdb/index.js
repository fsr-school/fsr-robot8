/* eslint-disable */
const request = require('request');
const cloud = require('wx-server-sdk');

// 环境变量
const env = process.env.id || 'fsr-back-robot8';


// "triggers": [
//   {
//     "name": "backdb_students_trigger",
//     "type": "timer",
//     "config": "*/30 * * * * * *"
//   }
// ]
cloud.init({
  env
});

// 换取 access_token
async function getAccessToken(appid, secret) {
  return new Promise((resolve, reject) => {
    request.get(
      `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`,
      (err, res, body) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(JSON.parse(body));
      }
    );
  });
}

// 创建导出任务
async function createExportJob(accessToken, collection) {
  const date = new Date().toISOString();
  const file_path = `${date}.json`; //backdb/

  return new Promise((resolve, reject) => {
    request.post(
      `https://api.weixin.qq.com/tcb/databasemigrateexport?access_token=${accessToken}`,
      {
        body: JSON.stringify({
          env,
          file_path: file_path,
          file_type: '1',
          query: `db.collection("${collection}").get()`
        })
      },
      (err, res, body) => {
        if (err) {
          reject(err);
        }
        const o = JSON.parse(body);
        o.file_path = file_path;
        resolve(o);
      }
    );
  });
}

// 查询导出任务状态
async function waitJobFinished(accessToken, jobId) {
  return new Promise((resolve, reject) => {
    // 轮训任务状态
    const timer = setInterval(() => {
      request.post(
        `https://api.weixin.qq.com/tcb/databasemigratequeryinfo?access_token=${accessToken}`,
        {
          body: JSON.stringify({
            env,
            job_id: jobId
          })
        },
        (err, res, body) => {
          if (err) {
            reject(err);
          }

          const { status, file_url } = JSON.parse(body);

          if (status === 'success') {
            clearInterval(timer);
            resolve(file_url);
          }
        }
      );
    }, 500);
  });
}

exports.main = async (event, context) => {
  const log = cloud.logger()

  // 从云函数环境变量中读取 appid 和 secret 以及数据集合
  const { appid, secret, collection } = process.env;

  const db = cloud.database();

  try {
    // 获取 access_token
    const { errmsg, access_token } = await getAccessToken(appid, secret);

    if (errmsg && errcode !== 0) {
      log.error({
        name: 'backdb',
        collection: collection,
        msg: errmsg
      });
      throw new Error(`数据库备份:获取 access_token 失败：${errmsg}` || '获取 access_token 为空');
    }

    // 导出数据库
    const { errmsg: jobErrMsg, errcode: jobErrCode, job_id, file_path } = await createExportJob(access_token, collection);

    if (jobErrCode !== 0) {
      log.error({
        name: 'backdb',
        collection: collection,
        access_token: access_token,
        file_path: file_path,
        msg: jobErrMsg
      });
      throw new Error(`数据库备份:创建备份任务失败：${jobErrMsg}`);
    }

    // 打印到日志中
    console.log(`数据库备份:任务创建成功 job_id:${job_id}`);
    // 等待任务完成
    const file_url = await waitJobFinished(access_token, job_id);

    // 打印到日志中
    log.info({
      name: 'backdb',
      collection: collection,
      access_token: access_token,
      file_path: file_path,
      job_id: job_id,
      file_url: file_url
    });
    console.log(`数据库备份:导出成功 fileUrl:${file_url}`);
  } catch (e) {
    throw new Error(`数据库备份:导出数据库异常：${e.message}`);
  }
};
