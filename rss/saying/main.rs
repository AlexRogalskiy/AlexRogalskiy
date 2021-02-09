mod create_saying_rss;

use create_saying_rss::create_saying_rss;

fn main() {
    match create_saying_rss() {
        Ok(_v) => println!("README.md file generated correctly"),
        Err(e) => println!("ERROR: there was an error: {:?}", e),
    }
}
