mod create_phrase_rss;

use create_phrase_rss::create_phrase_rss;

fn main() {
    match create_phrase_rss() {
        Ok(_v) => println!("README.md file generated correctly"),
        Err(e) => println!("ERROR: there was an error: {:?}", e),
    }
}
