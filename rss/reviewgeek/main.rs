mod create_reviewgeek_rss;

use create_reviewgeek_rss::create_reviewgeek_rss;

fn main() {
    match create_reviewgeek_rss() {
        Ok(_v) => println!("README.md file generated correctly"),
        Err(e) => println!("ERROR: there was an error: {:?}", e),
    }
}
