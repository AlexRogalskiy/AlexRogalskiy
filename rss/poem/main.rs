mod create_poem_rss;

use create_poem_rss::create_poem_rss;

fn main() {
    match create_poem_rss() {
        Ok(_v) => println!("README.md file generated correctly"),
        Err(e) => println!("ERROR: there was an error: {:?}", e),
    }
}
