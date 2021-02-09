mod create_idiom_rss;

use create_idiom_rss::create_idiom_rss;

fn main() {
    match create_idiom_rss() {
        Ok(_v) => println!("README.md file generated correctly"),
        Err(e) => println!("ERROR: there was an error: {:?}", e),
    }
}
