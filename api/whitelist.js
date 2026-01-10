export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ success: false, error: 'Method Not Allowed' });

    const { name } = req.body;
    if (!name) return res.status(400).json({ success: false, error: 'Nama tidak boleh kosong' });

    const panelUrl = "https://cx.galaxyhost.biz.id";
    const serverId = "6f1bbabe";
    const apiKey = "ptlc_NV4kmIU6k4pzuMi1JVogyB4nfpPGOjAjW1PB7fLaHi3"; // PASTIKAN COPY ULANG DARI PANEL

    // Bersihkan URL panel (hapus / di akhir jika ada)
    const cleanUrl = panelUrl.replace(/\/$/, "");
    
    // Gunakan path relatif tanpa garis miring di depan
    const filePath = `scriptfiles/whitelist/${name}.ini`;

    try {
        const response = await fetch(`${cleanUrl}/api/client/servers/${serverId}/files/write?file=${encodeURIComponent(filePath)}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'text/plain', // Ubah ke text/plain agar panel menerima body kosong
                'Accept': 'application/vnd.pterodactyl.v1+json'
            },
            body: "Whitelisted by WeblimzXd" // Isi sedikit teks agar file tidak benar-benar 0 byte
        });

        // Jika status 204 atau 200, berarti berhasil
        if (response.status === 204 || response.status === 200 || response.ok) {
            return res.status(200).json({ success: true });
        } else {
            const textError = await response.text();
            console.error("Panel Error:", textError);
            return res.status(500).json({ success: false, error: `Panel Reject (Status: ${response.status})` });
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: "Koneksi ke panel terputus" });
    }
}
