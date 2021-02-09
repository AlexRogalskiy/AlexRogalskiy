extern crate chrono;
extern crate rss;

use chrono::DateTime;
use rss::Channel;
use std::cmp::Ordering;
use std::fs;
use regex::Regex;
use regex::Captures;

struct FeedItem {
    title: String,
    description: String,
    link: String,
    pub_date: String,
}

pub fn create_idiom_rss() -> std::io::Result<()> {
    let tpl =
        fs::read_to_string("README.md")
        .expect("Something went wrong reading the README.md file");

    let re = Regex::new(r"<!--views:idiom-rss-marker:start-->[\s\S]*?<!--views:idiom-rss-marker:end-->").unwrap();
    let last_articles = format!("{}{}\n{}", "<!--views:idiom-rss-marker:start-->", get_latest_articles(), "<!--views:idiom-rss-marker:end-->");
    let result = re.replace(&tpl, |_caps: &Captures| { &last_articles });
    return fs::write(
        "README.md",
        &*result
    );
}

fn get_latest_articles() -> String {
    let mut posts: Vec<FeedItem> = get_blog_rss();

    // Sort articles by pub_date
    posts.sort_by(|a, b| {
        let date_a = DateTime::parse_from_rfc2822(&a.pub_date).unwrap();
        let date_b = DateTime::parse_from_rfc2822(&b.pub_date).unwrap();

        if date_b < date_a {
            Ordering::Less
        } else if date_b > date_a {
            Ordering::Greater
        } else {
            Ordering::Equal
        }
    });

    // Filter the last article + format each one as markdown list string
    return posts[..1].iter().fold("".to_string(), |_, item| {
        format!("\n<div align=\"center\" style=\"align-content: center\">\n<a href=\"{}\" target=\"_blank\"><i>{}</i></a>\n<br/><span>{}</span>\n</div>", item.link, item.title, item.description)
    });
}

// Fetch all articles of my blog on rss.xml
fn get_blog_rss() -> Vec<FeedItem> {
    return Channel::from_url("https://www.englishclub.com/ref/idiom-of-the-day.xml")
        .unwrap()
        .items()
        .iter()
        .map(|item| FeedItem {
            title: item.title().unwrap().to_string(),
            description: item.description().unwrap().to_string(),
            link: item.link().unwrap().to_string(),
            pub_date: item.pub_date().unwrap().to_string(),
        })
        .collect();
}
