mod create_slang_rss;

use create_slang_rss::create_slang_rss;

fn main() {
    match create_slang_rss() {
        Ok(_v) => println!("README.md file generated correctly"),
        Err(e) => println!("ERROR: there was an error: {:?}", e),
    }
}
