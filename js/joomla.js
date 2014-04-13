/**
 * Created by Administrator on 14-4-13.
 */
var dbConfig={
    host: 'localhost',
    user: 'root',
    database: 'joomla',
    password: 'm8nix'
};
var mysql = require('mysql');
function generateUUID() {
    var d = new Date().getTime();
    return  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
    });
    //return uuid;
}

function CreateArticle(catId,artTitle,artIntroTxt,artFulltxt,callBack) {
    var connection = mysql.createConnection(dbConfig);
    var d=new Date();
    var dt= d.toUTCString();
    console.log(dt);
    var insertAsset = "INSERT INTO `joomla`.`joomla_assets` (`id`, `parent_id`, `lft`, `rgt`, `level`, `name`, `title`, `rules`) VALUES (NULL, '35', '25', '26', '3', ?, ?, '{\"core.delete\":[],\"core.edit\":[],\"core.edit.state\":[]}');";
    var insertContent = "INSERT INTO `joomla`.`joomla_content` (`id`, `asset_id`, `title`, `alias`, `introtext`, `fulltext`, `state`, `catid`, `created`, `created_by`, `created_by_alias`, `modified`, `modified_by`, `checked_out`, `checked_out_time`, `publish_up`, `publish_down`, `images`, `urls`, `attribs`, `version`, `ordering`, `metakey`, `metadesc`, `access`, `hits`, `metadata`, `featured`, `language`, `xreference`) VALUES (NULL, ?, ?, ?, ?, ?, '1', ?, ?, '80', 'Joomla', '0000-00-00 00:00:00', '713', '0', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '{\"image_intro\":\"\",\"float_intro\":\"\",\"image_intro_alt\":\"\",\"image_intro_caption\":\"\",\"image_fulltext\":\"\",\"float_fulltext\":\"\",\"image_fulltext_alt\":\"\",\"image_fulltext_caption\":\"\"}', '{\"urla\":false,\"urlatext\":\"\",\"targeta\":\"\",\"urlb\":false,\"urlbtext\":\"\",\"targetb\":\"\",\"urlc\":false,\"urlctext\":\"\",\"targetc\":\"\"}', '{\"show_title\":\"\",\"link_titles\":\"\",\"show_tags\":\"\",\"show_intro\":\"\",\"info_block_position\":\"0\",\"show_category\":\"\",\"link_category\":\"\",\"show_parent_category\":\"\",\"link_parent_category\":\"\",\"show_author\":\"\",\"link_author\":\"\",\"show_create_date\":\"\",\"show_modify_date\":\"\",\"show_publish_date\":\"\",\"show_item_navigation\":\"\",\"show_icons\":\"\",\"show_print_icon\":\"\",\"show_email_icon\":\"\",\"show_vote\":\"\",\"show_hits\":\"\",\"show_noauth\":\"\",\"urls_position\":\"\",\"alternative_readmore\":\"\",\"article_layout\":\"\"}', '1', '0', '', '', '1', '0', '{\"robots\":\"\",\"author\":\"\",\"rights\":\"\",\"xreference\":\"\"}', '0', '*', '');";
    connection.connect();
    var assetName = generateUUID();
    var assetTitle = generateUUID();

    connection.query(insertAsset, [assetName, assetTitle], function (err, result) {
        if (err) throw err;

        console.log(result.insertId);
        var assetid = result.insertId;

        //var contentTitle = artTitle;
        var contentAlias = generateUUID();
        //var contentIntroText = artIntroTxt;
        //var contentFulltext = artFulltxt;
        connection.query(insertContent, [assetid, artTitle, contentAlias, artIntroTxt, artFulltxt,catId,dt], function (err, result) {
            if (err) callBack('fail');
            console.log(result.insertId);
            connection.end();
            callBack(result);
        });
    });
}

//CreateArticle(9,"test title5","test introduce3","test content3");

exports.CreateArticle=CreateArticle;