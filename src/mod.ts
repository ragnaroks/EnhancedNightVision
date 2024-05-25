import {DependencyContainer} from 'tsyringe';
import {IPostDBLoadMod} from '@spt-aki/models/external/IPostDBLoadMod';
import {ILogger} from "@spt-aki/models/spt/utils/ILogger";
import {DatabaseServer} from '@spt-aki/servers/DatabaseServer';
import {IDatabaseTables} from '@spt-aki/models/spt/server/IDatabaseTables';

const parentId = '5a2c3a9486f774688b05e574';
const itemArray = [
    '5c0558060db834001b735271',
    '57235b6f24597759bf5a30f1',
    '5c066e3a0db834001b7353f0',
    '5c0696830db834001d23f5da'
];

class Mod implements IPostDBLoadMod {
    public postDBLoad(container:DependencyContainer): void {
        const logger = container.resolve<ILogger>('WinstonLogger');
        const databaseServer = container.resolve<DatabaseServer>('DatabaseServer');
        
        const tables:IDatabaseTables = databaseServer.getTables();

        for (const iterator of itemArray) {
            const item = tables.templates.items[iterator] || null;
            if(!item || item._parent!==parentId){continue;}
            item._props.NoiseIntensity = 0;
            item._props.NoiseScale = 0;
            item._props.Color.r = 150; // 255
            item._props.Color.g = 214; // 255
            item._props.Color.b = 240; // 255
            item._props.Color.a = 254; // 0
            item._props.Intensity = 2;
            item._props.NoiseScale = 0;
            item._props.IsNoisy = false;
            item._props.IsMotionBlurred = false;
            item._props.IsFpsStuck = false;
            item._props.IsPixelated = false;
            item._props.IsGlitch = false;
            item._props.Mask = "Binocular";
            item._props.MaskSize = 2;
        }

        logger.warning('[EnhancedNightVision]: night-vision-equipments are modified');
    }
}

module.exports = {
    mod: new Mod()
};
