const fs = require('fs');
const pdf = require('pdf-creator-node');
const path = require('path');
// const options = require('../helpers/options');
const data = require('../helpers/data');


const homeview = (req, res, next) => {
    res.render('home');
}

const generatePdf = async (req, res, next) => {
    const html = fs.readFileSync(path.join(__dirname, '../views/report.html'), 'utf-8');
    const filename = Math.random() + '_doc' + '.pdf';
    let array = [];
    let dronelist = []
    var i = 0;

    data.forEach(d => {
        dronelist.push(d.droneId);
    })

    dronelist.forEach(d => {
        array.push({
            sno: i + 1,
            droneId: '',
            errs: [],
            num: 0
        })
        i++;
    })

    for (let k = 0; k < data.length; k++) {
        const err = {
            title: data[k].title,
            time: data[k].time,
            userId: data[k].userId,
        }
        for (j = 0; j < dronelist.length; j++) {
            if (data[k].droneId == dronelist[j]) {
                array[j].droneId = dronelist[j];
                array[j].errs.push(err);
                array[j].num = array[j].errs.length;
            }
        }

    }

    // array.forEach(i => {
    //     subtotal += i.total
    // });
    console.log(array);
    const obj = {
        errorlist: array,
    }
    const document = {
        html: html,
        data: {
            errors: obj
        },
        path: './docs/' + filename
    }
    pdf.create(document)
        .then(res => {
            console.log(res);
        }).catch(error => {
            console.log(error);
        });
    const filepath = 'http://localhost:3000/docs/' + filename;

    res.render('download', {
        path: filepath
    });
}


module.exports = {
    homeview,
    generatePdf
}