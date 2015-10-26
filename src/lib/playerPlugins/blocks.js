module.exports=inject;

function inject(serv,player)
{
  player.changeBlock=async (position,blockType) =>
  {
    serv.players
      .filter(p => p.world==player.world)
      .forEach(p => p.sendBlock(position, blockType));

    return await player.world.setBlockType(position,blockType);
  };
  
  player.sendBlock = (position, blockType) =>  // Call from player.setBlock unless you want "local" fake blocks
    player._client.write("block_change",{
        location:position,
        type:blockType<<4
    });

  player.setBlock = (position,blockType) => serv.setBlock(player.world,position,blockType);
}