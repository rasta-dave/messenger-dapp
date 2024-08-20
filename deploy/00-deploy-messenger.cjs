module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();
    await deploy("Messenger", {
        contract: "Messenger",
        from: deployer,
        args: ["Hello Devs... this is simple and fun"],
        log: true,
    });
};
module.exports.tags = ["Messenger"];
