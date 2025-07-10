module sarisend::sarisend {
    use AptosFramework::aptos_account;

    public entry fun send_payment(account: &signer, to: address, amount: u64) {
        aptos_account::transfer(account, to, amount);
    }
}
